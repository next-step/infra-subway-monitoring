import { sleep } from "k6";
import { subwayLoadTestSenarios } from "./senarios.js";

export const options = {
  stages: [
    { duration: "1m", target: 17 },
    { duration: "5m", target: 17 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
  },
};

const sleepForExpectedLatency = (expectedLatency) => {
  sleep(expectedLatency);
};

export default function () {
  subwayLoadTestSenarios();
  sleepForExpectedLatency(1);
}
