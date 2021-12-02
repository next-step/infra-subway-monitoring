import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://bgpark82.p-e.kr';
const USERNAME = 'test@test.com';
const PASSWORD = 'test';
const DATA = JSON.stringify({ email: USERNAME, password: PASSWORD });
const PARAMS = { headers: { 'Content-Type': 'application/json', }, };

export default () => {
    let loginRes = http.post(`${BASE_URL}/login/token`, DATA, PARAMS);

    check(loginRes, {
        'logged in successfully': (resp) => resp.status === 200,
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