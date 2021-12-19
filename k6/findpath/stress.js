import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 50 },
    { duration: '10s', target: 100 },
    { duration: '10s', target: 200 },
    { duration: '10s', target: 300 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

const BASE_URL = 'https://junhwankim.kro.kr';
const SOURCE_ID = 3
const TARGET_ID = 20

export default function ()  {

  let pathResponse = http.get(`${BASE_URL}/paths?source={SOURCE_ID}&target={TARGET_ID}`);
  check(pathResponse, { 'find path': (response) => response.status === 200 });
  sleep(1);
};

