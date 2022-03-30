import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://infra-subway.p-e.kr/login/token';
const USERNAME = 'admin@admin.com';
const PASSWORD = '1234';

export default function () {

    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginResponse = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginResponse, {
        'logged in successfully': (response) => response.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginResponse.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    sleep(1);
}