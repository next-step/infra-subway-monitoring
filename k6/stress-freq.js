import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
            { duration: '10s', target: 50 },
            { duration: '10s', target: 50 },
            { duration: '10s', target: 100 },
            { duration: '10s', target: 100 },
            { duration: '10s', target: 150 },
            { duration: '10s', target: 150 },
            { duration: '10s', target: 200 },
            { duration: '10s', target: 200 },
            { duration: '10s', target: 0 }
        ],
    thresholds: {
          http_req_duration: ['p(99)<1500']
        },
};

const BASE_URL = 'https://ch3224bin.n-e.kr';

export default function ()  {
    let pageResponse = http.get(BASE_URL);
    check(pageResponse, { 'page loading complete': (response) => response.status === 200 });
    sleep(1);
};
