import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

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