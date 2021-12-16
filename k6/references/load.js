import http from 'k6/http';
import { check, sleep } from 'k6';

// R = the number of requests per VU iteration = 4
// latency = 100ms
// T = (R * http_req_duration) + latency = (4 * 19.09ms) + 100ms = 176.36ms ~= 176ms
// VUser = (목표 rps * T) / R = (207 * 0.176s) / 4 = 9.11 ~= 9

export let options = {
  stages: [
    { duration: '5s', target: 9 },
    { duration: '10s', target: 9 * 3 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500']
  },
};

const BASE_URL = 'https://kelicia91.kro.kr/';

export default function () {
    let pathResponse = http.get(`${BASE_URL}/paths?source=3&target=4`);
    check(pathResponse, {
        'found path': response => response.status === 200
    });

    sleep(1);
};
