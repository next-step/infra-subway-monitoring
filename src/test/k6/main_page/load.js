import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 30 }, // ramp up to 30 users over 30 seconds.
    { duration: '30m', target: 30 }, // stay at 30 for 30 minutes.
    { duration: '1m', target: 0 }, // ramp down to 0 users.
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
