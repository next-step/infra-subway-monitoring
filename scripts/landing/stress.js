import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  stages: [
    { duration: "1m", target: 200 },
    { duration: "1m", target: 1000 },
    { duration: "1m", target: 2000 },
    { duration: "1m", target: 5000 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<150"], // 99% of requests must complete below 0.15s
  },
};

const BASE_URL = "https://gwk.kro.kr";

export default function () {
  const result = http.get(`${BASE_URL}`);
  check(result, {
    "landing page successful": (response) => response.status === 200,
  });
  sleep(1);
}
