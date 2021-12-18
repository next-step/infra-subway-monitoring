import http from 'k6/http';
import {check, sleep} from 'k6';
import { Rate } from "k6/metrics";

const errorRate = new Rate('errorRate');

const BASE_URL = 'https://wooobo.r-e.kr';

export let options = {
  stages: [
    {duration: "1m", target: 1000},
    {duration: "1m", target: 2000},
    {duration: "1m", target: 2000},
    {duration: "1m", target: 0},
  ],

  thresholds: {
    http_req_duration: ['p(99)<1500'],
    errorRate: [
      // more than 10% of errors will abort the test
      { threshold: 'rate < 0.1', abortOnFail: true, delayAbortEval: '1m' },
    ],
  },
};

export default function () {
  let pageResponse = http.get(BASE_URL);

  errorRate.add(pageResponse.status !== 200);

  check(pageResponse,
      {'page load success': (response) => response.status === 200});
  sleep(1);
};
