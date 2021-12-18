import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<900'], // 99% of requests must complete below 0.9s
    },
};

const BASE_URL = 'https://jerry92k-subway.n-e.kr/';
const USERNAME = 'test@gmail.com';
const PASSWORD = '1234';

export default function ()  {

    var loginPayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, loginPayload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });


    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };

    const modifyPayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 28
    });

    let modifiedResult = http.put(`${BASE_URL}/members/me`, modifyPayload, authHeaders);

    check(modifiedResult, { 'is status 200(ok)': (r) => r.status === 200 });
    sleep(1);

};