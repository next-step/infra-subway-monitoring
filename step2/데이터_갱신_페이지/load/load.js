import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5', target: 1 },
        { duration: '10s', target: 5 },
        { duration: '25s', target: 50 },
        { duration: '10s', target: 5 },
        { duration: '5', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://ssonsh-next-step.p-e.kr';
const USERNAME = 'chosunci@gmail.com';
const PASSWORD = '1234';

export default function ()  {
    let 로그인_요청_response = 로그인_요청();
    로그인_요청_성공(로그인_요청_response);

    let 토큰 = 토큰_추출(로그인_요청_response);
    let 개인정보_수정_response = 개인정보_수정(토큰, 20);
    개인정보_수정_요청_성공(개인정보_수정_response);
};


export function 로그인_요청() {
    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return http.post(`${BASE_URL}/login/token`, payload, params);
}

export function 로그인_요청_성공(로그인_요청_response) {
    check(로그인_요청_response, {
        '로그인 요청 결과 : ': (response) => response.status === 200,
        '로그인 성공': (response) => response.json('accessToken') !== '',
    });
}

export function 토큰_추출(로그인_요청_response) {
    return 로그인_요청_response.json('accessToken');
}

export function 개인정보_수정(토큰, updateAge) {
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${토큰}`,
        },
    };

    const requestBody = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: updateAge,
    });

    return http.put(`${BASE_URL}/members/me`, requestBody, params);
}

export function 개인정보_수정_요청_성공(개인정보_수정_response) {
    check(개인정보_수정_response, {
        '개인정보 수정 결과 : ': (response) => response.status === 200
    });
}