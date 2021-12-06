import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../common/common.js';

export let options = {
    stages: [
        { duration: '5', target: 1 },
        { duration: '10s', target: 5 },
        { duration: '15s', target: 25 },
        { duration: '20s', target: 40 },
        { duration: '25s', target: 50 },
        { duration: '20s', target: 40 },
        { duration: '15s', target: 25 },
        { duration: '10s', target: 5 },
        { duration: '5', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

export default function ()  {
    let 메인페이지_response = 메인페이지_접속_요청();
    메인페이지_결과_확인(메인페이지_response);

    let token_response = 로그인_요청();
    로그인_성공(token_response);

    let 나이변경_response = 로그인한_유저_나이_변경_요청(token_response, 30);
    로그인한_유저_나이_변경_성공(나이변경_response);
}

export function 메인페이지_접속_요청() {
    return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_response) {
    check(메인페이지_response, {
        '메인페이지 응답 결과 ===> ': (response) => response.status === 200
    });
}

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

export function 로그인_성공(token_response) {
    check(token_response, {
        '로그인 요청 응답 결과 ===> ': (response) => response.status === 200,
        '로그인 성공': (response) => response.json('accessToken') !== '',
    });
}

export function 로그인한_유저_나이_변경_요청(token_response, updatedAge) {
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token_response.json('accessToken')}`,
        },
    };

    const requestBody = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: updatedAge,
    });

    return http.put(`${BASE_URL}/members/me`, requestBody, params);
}

export function 로그인한_유저_나이_변경_성공(나이변경_response) {
    check(나이변경_response, {
        '로그인한 유저 나이 변경 요청 응답 결과 ===> ': (response) => response.status === 200
    });
}