import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 100 },
        { duration: '10s', target: 200 },
        { duration: '30s', target: 300 },
        { duration: '20s', target: 400 },
        { duration: '10s', target: 300 },
        { duration: '20s', target: 200 },
        { duration: '30s', target: 100 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://sooragenius.com';
const USERNAME = 'kyoing@naver.com';
const PASSWORD = 'qwe123';

export default function ()  {
    let loginRes = 로그인()
    로그인_검증하기(loginRes)

    let myObjects = 나의정보_조회하기(loginRes)

    나의정보_검증하기(myObjects)

    let lineRes = 라인_정보_가저오기(loginRes, 1);

    라인_정보_확인하기(lineRes, 1);

    let pathsRes = 경로_조회하기(loginRes, 1, 3)

    경로_조회하기_확인하기(pathsRes, 24)

    sleep(1);
};

export function 로그인() {
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

export function 로그인_검증하기(loginRes) {
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });
}

export function 나의정보_조회하기(loginRes) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    return http.get(`${BASE_URL}/members/me`, authHeaders).json();
}

export function 나의정보_검증하기(myObjects) {
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
}

export function 라인_정보_가저오기(loginRes, lineNumber) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    return http.get(`${BASE_URL}/lines/` + lineNumber, authHeaders).json();
}

export function 라인_정보_확인하기(lineRes, lineNumber) {
    check(lineRes, {
        'lines success!!': (resp) => resp['id'] == lineNumber,
    });
}

export function 경로_조회하기(loginRes, source, target) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    return http.get(`${BASE_URL}/paths/?source=` + source + `&target=`+target, authHeaders).json();
}

export function 경로_조회하기_확인하기(pathsRes, exceptDistance) {
    check(pathsRes, {
        'get shortest line success': (resp) => resp['distance'] == exceptDistance,
    });
}