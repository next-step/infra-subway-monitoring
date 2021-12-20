import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '2m', target: 500 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 1000 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 800 },
        { duration: '2m', target: 1000 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com'

export default function () {

    let response = http.get(`${BASE_URL}`);
    check(response, { 'lending page': (res) => res.status === 200 });
    sleep(1);
};