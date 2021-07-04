import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '15s', target: 50 },
    { duration: '10s', target: 100 },
    { duration: '15s', target: 200 },
    { duration: '10s', target: 240 },
    { duration: '1m', target: 240 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(90)<10000','p(95)<15000','p(99)<30000']
  },
};

const BASE_URL = 'https://woojang.n-e.kr';
const USERNAME = 'byunghakjang1230@gmail.com';
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
  let myObjects1 = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  let myObjects2 = http.get(`${BASE_URL}/paths?source=1&target=5`, authHeaders).json();
  check(myObjects1, { 'retrieved member': (obj) => obj.id != 0 });
  check(myObjects2, { 'find Paths': (obj) => obj.stations != null});
  sleep(1);
};
