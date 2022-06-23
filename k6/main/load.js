import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 3},
        {duration: '20s', target: 20},
        {duration: '20s', target: 34},
        {duration: '20s', target: 34},
        {duration: '10s', target: 30},
        {duration: '10s', target: 7},
        {duration: '10s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://pleasesubway.p-e.kr';

export default function ()  {

    let mainPageRes = http.get(`${BASE_URL}`);
    check(mainPageRes, { 'main page res code 200': (res) => res.status === 200 });

    sleep(1);
};