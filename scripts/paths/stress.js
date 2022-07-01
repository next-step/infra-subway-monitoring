import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 200 },
    { duration: "30s", target: 500 },
    { duration: "30s", target: 1000 },
    { duration: "30s", target: 2000 },
    { duration: "30s", target: 3000 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<150"], // 99% of requests must complete below 0.15s
  },
};

const BASE_URL = "https://gwk.kro.kr";

export default function () {
  const pathResponse = http.get(`${BASE_URL}/paths?source=1&target=5`);
  check(pathResponse, { "find path": (response) => response.status === 200 });

  const longerResponse = http.get(`${BASE_URL}/paths?source=1&target=87`);
  check(longerResponse, {
    "find longer path": (response) => response.status === 200,
  });
  sleep(1);
}
