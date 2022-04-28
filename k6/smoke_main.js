import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '15m',

    thresholds: {
        http_req_duration: ['p(99)<75'],
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

    // 로그인
    const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    // 마이 페이지
    const myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id !== 0 });

    sleep(1);
};
