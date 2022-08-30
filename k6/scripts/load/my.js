/**
 * 마이페이지에 대한 load test
 */

import http from 'k6/http';
import {check, sleep} from 'k6';
import {login, generateAuthorizationHeaderWith} from '../login.js';
import {Rate} from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  stages: [
    {duration: '1m', target: 9}, // simulate ramp-up of traffic from 1 to 9 users over 1 minutes.
    {duration: '5m', target: 9}, // stay at 9 users for 10 minutes
    {duration: '10s', target: 0}, // ramp-down to 0 users
  ],
  thresholds: {
    checks: ['rate>0.99'], // the rate of successful checks should be higher than 99%
    http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1s
  },
};

const BASE_URL = 'https://writer0713.o-r.kr/';
const RANDOM_AGE = generateRandomAgeBetween(10, 90);

export default function () {
  const authToken = login();
  getPersonalInformation(authToken);
  modifyPersonalInformation(authToken);
}

function getPersonalInformation(authToken) {
  const authHeaders = generateAuthorizationHeaderWith(authToken);
  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  const success = check(myObjects, {
    'retrieved my personal information': (obj) => obj.id != 0,
  });
  errorRate.add(!success);
  sleep(1);
}

function modifyPersonalInformation(authToken) {
  const authHeaders = generateAuthorizationHeaderWith(authToken);
  var payload = JSON.stringify({
    age: RANDOM_AGE,
    email: 'writer0713@naver.com',
    password: 'aaaa',
  });

  const res = http.put(`${BASE_URL}/members/me`, payload, authHeaders);
  const success = check(res, {
    'got 200 status-code after modifying personal information': (res) =>
      res.status === 200,
  });
  errorRate.add(!success);
  sleep(1);
}

/**
 * 나의 정보에서 age를 수정하기 위해 랜덤으로 값을 생성 (min ~ max 사이)
 * @param min
 * @param max
 * @returns random age
 */
function generateRandomAgeBetween(min, max) {
  return Math.random() * (max - min) + min;
}
