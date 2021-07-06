import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {

  stages: [
      { duration: '10s', target: 500 },
      { duration: '10s', target: 500 },
      { duration: '10s', target: 500 },
      { duration: '10s', target: 500 },
      { duration: '10s', target: 500 },
      { duration: '10s', target: 500 },
      { duration: '10s', target: 500 },
  ],

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://52.78.91.236:8080';
const USERNAME = 'taminging@kakao.com';
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


  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });


  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
  sleep(1);
};
