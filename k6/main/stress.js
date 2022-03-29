// stress.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 }, // below normal load
    { duration: '1m', target: 100 },
    { duration: '30s', target: 200 }, // normal load
    { duration: '1m', target: 200 },
    { duration: '30s', target: 300 }, // around the breaking point
    { duration: '1m', target: 300 },
    { duration: '30s', target: 400 }, // beyond the breaking point
    { duration: '1m', target: 400 },
    { duration: '2m', target: 0 }, // scale down. Recovery stage.
  ],
  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 0.1s
  },
};

const BASE_URL = 'https://yunha-infra-subway.r-e.kr';

export default function ()  {

  http.get(`${BASE_URL}`);

  sleep(1);
}                   

