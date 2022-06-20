import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '30m',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://mannue.kro.kr';
const USERNAME = 'sppe12@naver.com';
const PASSWORD = '1234';

export default function ()  {

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let response = http.get(`${BASE_URL}`);
    check(response, {
        'is status 200': (r) => r.status === 200,
    });
    sleep(1);
};