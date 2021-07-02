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
    let authHeaders = 로그인_검증_및_토큰_추출(loginRes);

    // 시나리오 2. 내 정보 조회
    let myObjects = 내정보_조회_요청(authHeaders);
    내정보_조회_검증(myObjects);

    // 시나리오 3. 지하철 역 조회
    let stations = 지하철_역_조회_요청(authHeaders);
    지하철_역_조회_검증(stations);

    // 시나리오 4. 경로 조회
    let shortestPath = 경로_조회_요청(authHeaders, 1, 37);
    경로_조회_검증(shortestPath);

    // 시나리오 5. 즐겨찾기 조회
    let favorites = 즐겨찾기_조회_요청(authHeaders);
    즐겨찾기_조회_검증(favorites);

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

export function 내정보_조회_요청 (authHeaders) {
    return http.get(`${BASE_URL}/members/me`, authHeaders).json();
}

export  function 내정보_조회_검증(myObjects) {
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
}

export function 지하철_역_조회_요청(authHeaders) {
    return http.get(`${BASE_URL}/stations`, authHeaders).json();
}

export function 지하철_역_조회_검증(stations) {
    check(stations, {
        'get stations': (resp) => resp !== '',
    });
}

export function 경로_조회_요청(authHeaders, source, target) {
    return http.get(`${BASE_URL}/paths?source=` + source + `&target=`+target, authHeaders).json();
}

export function 경로_조회_검증(shortestPath) {
    check(shortestPath, {
        'get shortestPath': (resp) => resp !== '',
    });
}

export function 즐겨찾기_조회_요청(authHeaders) {
    return http.get(`${BASE_URL}/favorites`, authHeaders).json();
}

export function 즐겨찾기_조회_검증(favorites) {
    check(favorites, {
        'get favorites': (resp) => resp !== '',
    });
}
