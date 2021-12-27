import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 30},
        {duration: '10s', target: 80},
        {duration: '20s', target: 130},
        {duration: '10s', target: 80},
        {duration: '10s', target: 30}
    ],

    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};
const BASE_URL = 'https://coding-knowjam.kro.kr';
const USERNAME = 'test@naver.com';
const PASSWORD = 'password';

export function login() {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return http.post(`${BASE_URL}/login/token`, payload, params);
}

export function myPage(loginRes){
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    return http.get(`${BASE_URL}/mypage`, authHeaders);
}

export function memberUpdate(loginRes) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };

    let params = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30
    });

    return http.put(`${BASE_URL}/members/me`, params, authHeaders);
}



export default function () {
    const loginRes = login();
    check(loginRes, { 'login success': (response) => response.json('accessToken') !== '' });
    sleep(1);
    check(myPage(loginRes), {'mypage success' : (response) => response.status === 200});
    sleep(1);
    check(memberUpdate(loginRes), {'memberUpdate success' : (response) => response.status === 200});
    sleep(1);
};
