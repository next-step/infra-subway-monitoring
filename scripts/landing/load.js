import http from "k6/http";
import { check, group, sleep, fail } from "k6";

const avgVu = 230;
const maxVu = 2300;

export let options = {
  stages: [
    { duration: "1m", target: avgVu },
    { duration: "2m", target: maxVu },
    { duration: "1m", target: avgVu },
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
