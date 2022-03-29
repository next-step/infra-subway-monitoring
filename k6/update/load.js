// load.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 59 }, // simulate ramp-up of traffic from 1 to 15-16 users over 5 minutes.
    { duration: '2m', target: 59 }, // stay at 15-16 users for 10 minutes
    { duration: '10s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<100'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://yunha-infra-subway.r-e.kr';
const USERNAME = 'example@test.com';
const PASSWORD = 'nextstep!1';

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
  check(loginRes, {'logged in successfully': (resp) => resp.json('accessToken') !== '',});


  let authHeaders = {
    headers: {
        Authorization: `Bearer ${loginRes.json('accessToken')}`,
        'Content-Type': 'application/json',
    },  
  };

  var updatePayload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
    age: 30
  });

  let updateRes = http.put(`${BASE_URL}/members/me`, updatePayload, authHeaders);
  check(updateRes, { 'updated member successfully': (resp) => resp.status === 200 });

  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });


  sleep(1)
};