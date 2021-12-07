import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: "30s", target: 50 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: "1m", target: 50 }, // stay at 100 users for 10 minutes
    { duration: "10s", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.0s
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

