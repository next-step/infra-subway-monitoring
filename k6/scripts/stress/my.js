/**
 * 마이페이지에 대한 smoke test
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { login, generateAuthorizationHeaderWith } from '../login.js';

export let options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '5m', target: 200 },
    { duration: '5m', target: 300 },
    { duration: '5m', target: 400 },
    { duration: '5m', target: 500 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<500'], // 99% of requests must complete below 0.5s
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
  check(myObjects, {
    'retrieved my personal information': (obj) => obj.id != 0,
  });
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
  check(res, {
    'got 200 status-code after modifying personal information': (res) =>
      res.status === 200,
  });
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
