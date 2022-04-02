import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 4 },
        { duration: '10s', target: 4 },
        { duration: '20s', target: 25 },
        { duration: '20s', target: 25 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 80 },
        { duration: '30s', target: 80 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 100 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'],
        'logged in successfully': ['p(99)<200'],
    },
};

const BASE_URL = 'https://wgs-runningmap.kro.kr/';
const USERNAME = 'ugs1575@gmail.com';
const PASSWORD = 'secret';

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
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    sleep(1);
};