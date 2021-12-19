import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import {BASE_URL} from '../testInfo.js';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

export default function ()  {
  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let pathRes = http.get(`${BASE_URL}/paths/?source=1&target=29`, params);

  check(pathRes, {
    'Http Response Code 200': (response) => response.status === 200,
    'Success Path Distance 39': (response) => response.json('distance') === 39
  });

  sleep(1);
};

