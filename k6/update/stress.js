// stress.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 }, // below normal load
    { duration: '2m', target: 100 },
    { duration: '1m', target: 200 }, // normal load
    { duration: '2m', target: 200 },
    { duration: '1m', target: 300 }, // around the breaking point
    { duration: '2m', target: 300 },
    { duration: '1m', target: 400 }, // beyond the breaking point
    { duration: '2m', target: 400 },
    { duration: '3m', target: 0 }, // scale down. Recovery stage.
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};


const BASE_URL = 'https://yunha-infra-subway.o-r.kr';
const USERNAME = 'test@example.com';
const PASSWORD = 'nextstep!1';

export default function ()  {

  const before = new Date().getTime();
  const T = 2;

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

  const after = new Date().getTime();
  const diff = (after - before) / 1000;
  const remainder = T - diff;
  check(remainder, { 'reached request rate': remainder > 0 });
  if (remainder > 0) {
    sleep(remainder);
  } else {
    console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
  }
};