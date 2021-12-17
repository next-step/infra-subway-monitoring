import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://hidy.kro.kr';
const email = 't@t.com';
const password = 't';
const params = {headers: {'Content-Type': 'application/json'}};
const loginPayload = JSON.stringify({email, password});

export default function () {
    // 로그인 시도
    const loginResponse = http.post(`${BASE_URL}/login/token`,
        loginPayload, params).json();
    check(loginResponse, {
        'logged in successfully': response => response.accessToken !== '',
    });

    // 내 정보 조회
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginResponse.accessToken}`,
            'Content-Type': 'application/json',
        }
    };
    const retrievedResponse = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(retrievedResponse, {'retrieved member': obj => obj.id !== 0});

    // 내정보 수정
    const updatedResponse = http.put(`${BASE_URL}/members/me`,
        JSON.stringify({email, password, age: 10}), authHeaders);

    check(updatedResponse,
        {'updated member': response => response.status === 200}
    );
    sleep(1);
}