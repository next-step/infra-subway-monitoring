import { sleep } from "k6";
import { subwayLoadTestSenarios } from "./senarios.js";

export const options = {
  vus: 1, // 1 user looping for 1 minute
  duration: "10s",

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
