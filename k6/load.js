import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

const RAMP_TIME = '3m';
const MIDDLE_VUSER = 40;
const MAX_VUSER = 83;

export let options = {
    stages: [
        { duration: RAMP_TIME, target: MIDDLE_VUSER },
        { duration: RAMP_TIME, target: MAX_VUSER },
        { duration: RAMP_TIME, target: MAX_VUSER },
        { duration: RAMP_TIME, target: MIDDLE_VUSER },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<500'], // 99% of requests must complete below 0.5s
    },
};

const BASE_URL = 'https://dibtp1221.kro.kr/';
const USERNAME = 'dibtp1221@gmail.com';
const PASSWORD = '1221';

export default function ()  {

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params).json();

    check(loginRes, {
        'logged in successfully': (resp) => resp.accessToken !== undefined,
    });


    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.accessToken}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();

    check(myObjects, { 'retrieved member': (obj) => obj.id === 1 });

    let pathObject = http.get(`${BASE_URL}/paths?source=24&target=12`).json();

    check(pathObject, {'correct path': (obj) => obj.distance === 25 });
    sleep(1);
};