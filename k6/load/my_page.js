import http from 'k6/http';
import {check, sleep} from 'k6';
import {headerWithAuthorizationAndToken, login} from '../login.js';
import {Rate} from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  stages: [
    { duration: '1m', target: 1 }, // Stage: ramp up
    { duration: '3m', target: 3 }, // Stage: ramp up
    { duration: '5m', target: 17 }, // Stage: stay
    { duration: '3m', target: 3 }, // Stage: ramp down
    { duration: '10s', target: 0 }, // Stage: ramp down
  ],
  thresholds: {
    checks: ['rate>0.99'],
    http_req_duration: ['p(99)<200'],
  },
};

const BASE_URL = 'https://orgojy.ga/';
const MY_EMAIL = 'orgojy@gmail.com';
const MY_PASSWORD = '1234';
const MY_AGE = randomAgeBetween(15, 100);

export default function () {
  const authToken = login(MY_EMAIL, MY_PASSWORD);
  getMyInformation(authToken);
  updateMyInformation(authToken);
}

function getMyInformation(authToken) {
  const authHeaders = headerWithAuthorizationAndToken(authToken);
  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  const success = check(myObjects, {
    'Get my information': (obj) => obj.id !== 0,
  });
  errorRate.add(!success);
  sleep(1);
}

function updateMyInformation(authToken) {
  const authHeaders = headerWithAuthorizationAndToken(authToken);
  let payload = JSON.stringify({
    age: MY_AGE,
    email: MY_EMAIL,
    password: MY_PASSWORD,
  });
  const response = http.put(`${BASE_URL}/members/me`, payload, authHeaders);
  const success = check(response, {
    'Update my information': (res) =>
        res.status === 200,
  });
  errorRate.add(!success);
  sleep(1);
}

function randomAgeBetween(min, max) {
  return Math.random() * (max - min) + min;
}
