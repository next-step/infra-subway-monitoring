import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://web.idion.kro.kr';

export default function () {
  let mainPageRes = http.get(BASE_URL);

  check(mainPageRes, {
    'main page load successfully': (resp) => resp.status === 200,
  });
};
