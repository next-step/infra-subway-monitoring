import http from "k6/http";
import { check, group, sleep, fail } from "k6";

const avgVu = 50;
const maxVu = 500;

export let options = {
  stages: [
    { duration: "2m", target: avgVu },
    { duration: "4m", target: maxVu },
    { duration: "2m", target: avgVu },
  ],
  thresholds: {
    http_req_duration: ["p(99)<250"], // 99% of requests must complete below 0.15s
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
