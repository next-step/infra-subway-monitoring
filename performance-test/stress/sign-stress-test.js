import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 60 },
        { duration: '2m', target: 60 },
        { duration: '1m', target: 120 },
        { duration: '2m', target: 120 },
        { duration: '1m', target: 180 },
        { duration: '2m', target: 180 },
        { duration: '1m', target: 240 },
        { duration: '2m', target: 240 },
        { duration: '10s', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

const BASE_URL = 'https://mwkwon-service.kro.kr';

export default function () {

    let payload = JSON.stringify({
        email: `${Date.now()}@nextstep.com`,
        password: 'test',
        age: '37'
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let pathsRes = http.post(`${BASE_URL}/members`, payload, params);

    check(pathsRes, {
        'sign in successfully': (resp) => resp.status === 201
    });
    sleep(1);
};