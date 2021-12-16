import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://kelicia91.kro.kr/';
const USERNAME = 'member@mail.com';
const PASSWORD = '<secret>';

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginRes = http.post(`${BASE_URL}/login/token`, JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    }), params);
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    const updatedObject = http.put(`${BASE_URL}/members/me`, JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30
    }), authHeaders).json();
    check(updatedObject, {'updated member': obj => obj.id !== 0});

    sleep(1);
}
