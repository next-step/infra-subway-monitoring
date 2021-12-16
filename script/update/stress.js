import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
  stages: [
    {duration: '30s', target: 300},
    {duration: '29m', target: 300},
    {duration: '30s', target: 0},
  ],

  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

const BASE_URL = 'https://mnonm-subway.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = 'hi';
const AGE = 20;

export default function () {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
    age: AGE,
  });

  let myObjects = http.put(`${BASE_URL}/members/me`, payload, authHeaders).json();
  check(myObjects, {'retrieved member': (obj) => obj.id != 0});
  sleep(1);
};
