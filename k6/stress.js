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

const BASE_URL = 'https://yunha-infra-subway.o-r.kr/';
const USERNAME = 'test@example.com';
const PASSWORD = 'nextstep!1';

export default function ()  {
  const before = new Date().getTime();
  const T = 2;

  http.get(`${BASE_URL}/path`);

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
                                                          


