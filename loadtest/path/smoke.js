import http from "k6/http";
import { check, group, sleep, fail } from "k6";
export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: "10s",
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1s
  },
};

const BASE_URL = "https://sojeong-subway.n-e.kr/";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";

export default function () {
  let loginResponse = 로그인();
  경로_조회(loginResponse)
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
    'logged in successfully': (response) => response.json('accessToken') !== '',
  });
  return response;
}

export function 경로_조회(loginRes) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  const path = http.get(`${BASE_URL}/paths/?source=3&target=6`, authHeaders).json();
  check(path, { 'path search success': (obj) => obj.distance === 4 });
}