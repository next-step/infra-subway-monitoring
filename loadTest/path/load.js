import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 34,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://3.36.50.109:8080';
const USERNAME = 'abc@abc.com';
const PASSWORD = '123123';

export default function ()  {

  http.get(`${BASE_URL}/paths/?source=3&target=4`);

  sleep(1);
};
