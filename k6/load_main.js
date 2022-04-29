import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '3m', target: 8 },
        { duration: '3m', target: 8 },
        { duration: '3m', target: 40 },
        { duration: '3m', target: 75 },
        { duration: '3m', target: 75 },
    ],
    thresholds: {
        http_req_duration: ['p(95) < 50', 'p(99) < 75'],
        'logged in successfully': ['p(99) < 75'],
    },
};

const BASE_URL = 'https://shineoov.p-e.kr';
const USERNAME = 'test@example.com';
const PASSWORD = '1234';

export default () => {
    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    const myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id !== 0 });
    sleep(1);
};
