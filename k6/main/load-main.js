import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 50 },
        { duration: '10s', target: 100 },
        { duration: '20s', target: 100 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://jennie267-alb-2134274569.ap-northeast-2.elb.amazonaws.com';

export default function ()  {
    let response = http.get(`${BASE_URL}`);
    check(response, { 'is ok': (res) => res.status === 200 });
    sleep(1);
};