import http from "k6/http";
import { check, group, sleep, fail } from "k6";
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
const BASE_URL = "https://sojeong-subway.n-e.kr/";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";
export default function () {
  let loginRes = 로그인();
  sleep(1);
}

export function 로그인() {
  const payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = http.post(`${BASE_URL}/login/token`, payload, params);

   check(response, {
    'log in success': (response) => response.json('accessToken') !== '',
  });
  return response;
}
