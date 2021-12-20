import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 300 }, // below normal load
    { duration: '5m', target: 400 },
    { duration: '2m', target: 500 }, // normal load
    { duration: '5m', target: 600 },
    { duration: '2m', target: 500 }, // around the breaking point
    { duration: '5m', target: 600 },
    { duration: '2m', target: 700 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://3.36.50.109:8080';
const USERNAME = 'abc@abc.com';
const PASSWORD = '123123';

export default function ()  {

  http.get(`${BASE_URL}/path`);

  sleep(1);
};