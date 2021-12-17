import http from 'k6/http';
import {check, sleep} from 'k6';

const BASE_URL = 'http://localhost:8080';

// 요청 수 : 1
// http_req_duration : 0.5
// T = (1 * 0.5) + 1 = 1.5
// VUser = (340 * 1.5) / 1 = 510
export let options = {
  stages: [
    {duration: "10s", target: 100},
    {duration: "20s", target: 250},
    {duration: "20s", target: 510},
    {duration: "10s", target: 0},
  ],

  thresholds: {
    http_req_duration: ['p(99)<1500'],
  },
};

export default function () {
  let pageResponse = http.get(BASE_URL);
  check(pageResponse,
      {'page load success': (response) => response.status === 200});
  sleep(1);
};
