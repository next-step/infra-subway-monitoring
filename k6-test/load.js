import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    scenarios: {
        averageTest: {
            executor: 'constant-vus',
            vus: 20,
            duration: '60s',
        },
        peakTimeTest: {
            executor: 'constant-vus',
            startTime: '80s',
            vus: 100,
            duration: '60s',
        }
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
