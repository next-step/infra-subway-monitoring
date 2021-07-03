import http from "k6/http";
import { check, group, sleep, fail } from "k6";
export let options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "1m", target: 50 },
    { duration: "15s", target: 0 },
    { duration: "30s", target: 100 },
    { duration: "1m", target: 100 },
    { duration: "15s", target: 0 },
    { duration: "30", target: 50 },
    { duration: "1m", target: 50 },
    { duration: "15s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
  },
};
const BASE_URL = "https://sojeong-subway.n-e.kr/";
const USERNAME = "user1@test.com";
const PASSWORD = "1234";
export default function () {
  var params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  let mainRes = http.get(`${BASE_URL}`);
  check(mainRes, { "load main successfully ": (resp) => resp.status === 200 });
  sleep(1);
}