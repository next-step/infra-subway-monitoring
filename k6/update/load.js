import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 50 },
    { duration: '5s', target: 100 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

const BASE_URL = 'https://junhwankim.kro.kr';
const USERNAME = 'test@testemail.com';
const PASSWORD = '1234';

export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let loginResponse = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginResponse, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });


  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginResponse.json('accessToken')}`,
    },
  };
  let updateResponse = http.put(`${BASE_URL}/members/me`, JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
    age: 30
  }), authHeaders);
  check(updateResponse, { 'update ok': (response) => response.status === 200 });
  sleep(1);
};

