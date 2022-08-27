import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 }, // below normal load
    { duration: '2m', target: 100 },
    { duration: '1m', target: 150 }, // below normal load
    { duration: '2m', target: 150 },
    { duration: '1m', target: 200 }, // normal load
    { duration: '2m', target: 200 },
    { duration: '1m', target: 250 }, // around the breaking point
    { duration: '2m', target: 250 },
    { duration: '1m', target: 300 }, // beyond the breaking point
    { duration: '2m', target: 300 },
    { duration: '10m', target: 0 }, // recovery stage
  ],

  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
  },
};

const BASE_URL = 'https://web.idion.kro.kr';

export default function () {
  let mainPageRes = http.get(BASE_URL);

  check(mainPageRes, {
    'main page load successfully': (resp) => resp.status === 200,
  });
};
