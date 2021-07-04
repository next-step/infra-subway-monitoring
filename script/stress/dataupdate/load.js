import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 35 },
        { duration: '2m', target: 35 },
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://joojimin.kro.kr';
const USERNAME = 'wnwlals22@naver.com';
const PASSWORD = '123123';

export default function ()  {

    // 시나리오 1. 로그인 ( 토큰 발급 )
    let loginRes = 로그인_요청();
    로그인_검증_및_토큰_추출(loginRes);

    // 시나리오 2. 내정보_업데이트
    let updatedRes = 내정보_업데이트_요청(1, 31);
    내정보_업데이트_검증(updatedRes);

    sleep(1);
};

export function 로그인_요청 () {
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

export function 로그인_검증_및_토큰_추출 (loginRes) {
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });
}

export function 내정보_업데이트_요청(memberId, age) {
    var data = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: age,
    });
    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return http.put(`${BASE_URL}/members/${memberId}`, data, params);
}

export function 내정보_업데이트_검증(updateRes) {
    check(updateRes, {
        'updated in  successfully': (resp) => resp.status === 200
    });
}
