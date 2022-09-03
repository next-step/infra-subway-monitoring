import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '20s', target: 90 }, // simulate ramp-up of traffic from 1 to 90 users over 20 seconds.
        { duration: '3m', target: 90 }, // stay at 90 users for 3 minutes
        { duration: '20s', target: 180 }, // simulate ramp-up of traffic from 1 to 180 users over 20 seconds.
        { duration: '3m', target: 180 }, // stay at 180 users for 3 minutes
        { duration: '20s', target: 270 }, // simulate ramp-up of traffic from 1 to 270 users over 20 seconds.
        { duration: '3m', target: 270 }, // stay at 270 users for 3 minutes
        { duration: '20s', target: 360 }, // simulate ramp-up of traffic from 1 to 360 users over 20 seconds.
        { duration: '3m', target: 360 }, // stay at 360 users for 3 minutes
        { duration: '20s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://wbluke-infraworkshop.kro.kr';
const USERNAME = 'test@test.com';
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


    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    let myObjects = http.get(`${BASE_URL}/path`, authHeaders);
    check(myObjects, { 'path searching page': (res) => res.status === 200 });
    sleep(1);
};