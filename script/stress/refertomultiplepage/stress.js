import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '2s', target: 100 },
        { duration: '3s', target: 200 },
        { duration: '3s', target: 350 },
        { duration: '5s', target: 450 },
        { duration: '5s', target: 450 },
        { duration: '3s', target: 350 },
        { duration: '3s', target: 200 },
        { duration: '2s', target: 100 },
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://joojimin.kro.kr';
const USERNAME = 'wnwlals22@naver.com';
const PASSWORD = '123123';

export default function ()  {

    // 시나리오 1. 로그인 ( 토큰 발급 )
    let loginRes = 로그인_요청();
    let authHeaders = 로그인_검증_및_토큰_추출(loginRes);

    // 시나리오 2. 경로 조회
    let shortestPath = 경로_조회_요청(authHeaders, 1, 37);
    경로_조회_검증(shortestPath);

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

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    return authHeaders;
}

export function 경로_조회_요청(authHeaders, source, target) {
    return http.get(`${BASE_URL}/paths?source=` + source + `&target=`+target, authHeaders).json();
}

export function 경로_조회_검증(shortestPath) {
    check(shortestPath, {
        'get shortestPath': (resp) => resp !== '',
    });
}
