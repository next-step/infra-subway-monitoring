import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
    stages: [
        { duration: '10s', target: 200 }, // below normal load
        { duration: '30s', target: 200 },
        { duration: '10s', target: 500 }, // normal load
        { duration: '30s', target: 500 },
        { duration: '10s', target: 700 }, // around the breaking point
        { duration: '30s', target: 700 },
        { duration: '10s', target: 800 }, // beyond the breaking point
        { duration: '30s', target: 800 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://jdragon.r-e.kr';
const USERNAME = 'koola976@gmail.com';
const PASSWORD = '1234';

export default function () {
    let loginRes = http.post(`${BASE_URL}/login/token`,
        JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
        })
        , {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    check(loginRes, {
        'login successfully': (resp) => resp.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };

    let updateRes = http.put(`${BASE_URL}/members/me`,
        JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
            age: 77
        }),
        authHeaders);
    check(updateRes, { 'updated member': (resp) => resp.status === 200 });

    let myObjects = http.get(`${BASE_URL}/members/me`,
        authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id === 1 });

    sleep(1);
};
