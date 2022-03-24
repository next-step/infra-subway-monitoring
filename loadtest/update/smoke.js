import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
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
