import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 15 }, // below normal load
    { duration: '1m', target: 15 },
    { duration: '10s', target: 400 }, // spike to 400 users
    { duration: '3m', target: 400 }, // stay at 400 for 3 minutes
    { duration: '10s', target: 15 }, // scale down. Recovery stage.
    { duration: '3m', target: 15 },
    { duration: '10s', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 200ms
  },
};

const BASE_URL = 'https://web.idion.kro.kr';

export default function () {
  let mainPageRes = http.get(BASE_URL);

  check(mainPageRes, {
    'main page load successfully': (resp) => resp.status === 200,
  });
};
