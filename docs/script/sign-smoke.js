import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://public.enemfk777.kro.kr';

export default function ()  {

    var payload = JSON.stringify({
        email: `${Date.now()}@nextstep.com`,
        password: 'nextstep',
        age: '30'
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let loginRes = http.post(`${BASE_URL}/members`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.status === 201
    });

    sleep(1);
};
