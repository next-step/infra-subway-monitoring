import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    scenarios: {
        testWithVUs10: {
            executor: 'constant-vus', vus: 10, duration: '30s',
        },
        testWithVUs30: {
            executor: 'constant-vus', startTime: '30s', vus: 30, duration: '30s',
        },
        testWithVUs50: {
            executor: 'constant-vus', startTime: '60s', vus: 50, duration: '30s',
        },
        testWithVUs70: {
            executor: 'constant-vus', startTime: '90s', vus: 70, duration: '30s',
        },
        testWithVUs90: {
            executor: 'constant-vus', startTime: '120s', vus: 90, duration: '30s',
        },
        testWithVUs110: {
            executor: 'constant-vus', startTime: '150s', vus: 110, duration: '30s',
        },
        testWithVUs130: {
            executor: 'constant-vus', startTime: '180s', vus: 130, duration: '30s',
        },
        testWithVUs150: {
            executor: 'constant-vus', startTime: '210s', vus: 150, duration: '30s',
        },
    },

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://xn--vo5bi4h.xn--yq5b.xn--3e0b707e';
const USERNAME = 'abc@gmail.com';
const PASSWORD = '123456';

export default function ()  {

    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    const params = {
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
            'Authorization': `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myInfoObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myInfoObjects, {
        'retrieved member': (obj) => obj.id !== 0,
    });


    const updatePayload = JSON.stringify({
        'age': '32',
        'email': USERNAME,
        'password': PASSWORD,
    });

    let updateHeaders = {
        headers: {
            'Authorization': `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };
    let updateRes = http.put(`${BASE_URL}/members/me`, updatePayload, updateHeaders);
    check(updateRes, {
        'information updated': (res) => res.status === 200
    });


    let pathObjects = http.get(`${BASE_URL}/paths/?source=7&target=29`).json();
    check(pathObjects, {
        'retrieved path': (obj) => obj.stations !== undefined
    });

    sleep(1);
}
