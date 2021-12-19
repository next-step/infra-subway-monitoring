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
const USERNAME = 'jennie267@email.com';
const PASSWORD = 'jennie267';

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
            'Content-Type': 'application/json',
        },
    };
    
    var modifyPayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30
    });
    
    let response = http.put(`${BASE_URL}/members/me`, modifyPayload, authHeaders);
    check(response, { 'is ok': (res) => res.status === 200 });
    sleep(1);
};