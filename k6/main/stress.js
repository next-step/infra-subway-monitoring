import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 50 },
    { duration: '10s', target: 100 },
    { duration: '10s', target: 200 },
    { duration: '10s', target: 400 },
    { duration: '5s', target: 800 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<100'], 
  },
};

const BASE_URL = 'https://junhwankim.kro.kr';

export default function ()  {

  let mainResponse = http.get(`${BASE_URL}`);
  check(mainResponse, {
    'status ok': response => response.status === 200
  });
  sleep(1);
};

