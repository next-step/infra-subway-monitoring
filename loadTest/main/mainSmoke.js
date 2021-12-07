import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://nhs0912-subway-infra.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = '1234';

export default function ()  {

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let main = http.get(`${BASE_URL}`);
  check(main, {"main page loading successfully " :(response) => response.status === 200});
  sleep(1);
};

