// load.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 79 }, // simulate ramp-up of traffic from 1 to 15-16 users over 5 minutes.
    { duration: '2m', target: 79 }, // stay at 15-16 users for 10 minutes
    { duration: '10s', target: 0 }, // ramp-down to 0 users
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

  http.get(`${BASE_URL}`);

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
