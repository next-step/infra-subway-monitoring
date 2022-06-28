import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  stages: [
    { duration: "1m", target: 500 }, // simulate ramp-up of traffic from 1 to 100 users over 1 minute.
    { duration: "2m", target: 500 }, // stay at 100 users for 2 minutes
    { duration: "10s", target: 0 }, // ramp-down to 0 users
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
