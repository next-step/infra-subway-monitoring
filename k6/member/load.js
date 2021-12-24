import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 50},
        {duration: '10s', target: 100},
        {duration: '20s', target: 150},
        {duration: '10s', target: 100},
        {duration: '10s', target: 50}
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 1500'],
    },
};

const BASE_URL = 'https://moonjuhyeon-utc.n-e.kr/';
const USERNAME = 'test@test';
const PASSWORD = '1234';

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

export function mypage(loginRes){
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
    check(mypage(loginRes), {'mypage success' : (response) => response.status === 200});
    sleep(1);
    check(memberUpdate(loginRes), {'memberUpdate success' : (response) => response.status === 200});
    sleep(1);
};
