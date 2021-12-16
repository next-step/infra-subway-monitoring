import http from 'k6/http';
import { check, sleep } from 'k6';

// R = the number of requests per VU iteration = 4
// latency = 100ms
// T = (R * http_req_duration) + latency = (4 * 7.37ms) + 100ms = 129.48ms ~= 129ms
// VUser = (목표 rps * T) / R = (207 * 0.129s) / 4 = 6.68 ~= 7

export let options = {
  stages: [
    { duration: '5s', target: 7 },
    { duration: '10s', target: 7 * 3 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500']
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
