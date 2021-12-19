import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../testInfo.js';

export let options = {
  stages: [
    {duration: '5s', target: 300},
    {duration: '10s', target: 300},
    {duration: '5s', target: 0}
  ],

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

export default function ()  {
  let payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  let params = {
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
  check(myObjects, { 'retrieved member': (obj) => obj.id !== 0 });
  sleep(1);
};

