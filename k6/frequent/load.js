import http from 'k6/http';
import { check, sleep } from 'k6';

// R = the number of requests per VU iteration = 4
// latency = 100ms
// T = (R * http_req_duration) + latency = (4 * 2.42ms) + 100ms = 109.68ms ~= 110ms
// VUser = (목표 rps * T) / R = (207 * 0.11s) / 4 = 5.69 ~= 6

export let options = {
  stages: [
    { duration: '5s', target: 6 },
    { duration: '10s', target: 6 * 3 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500']
  },
};

const BASE_URL = 'https://kelicia91.kro.kr/';

export default function ()  {
    let mainResponse = http.get(`${BASE_URL}`);
    check(mainResponse, {
        'load main page': response => response.status === 200
    });

    sleep(1);
};
