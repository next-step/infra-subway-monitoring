import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 13 },
        { duration: '1m', target: 19 },
        { duration: '1m', target: 26 },
        { duration: '1m', target: 39 },
        { duration: '1m', target: 26 },
        { duration: '1m', target: 19 },
        { duration: '1m', target: 13 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://apio1130.r-e.kr/';
const USERNAME = 'apio1130@naver.com';
const PASSWORD = 'apio1130';

export default function ()  {

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // 1. 로그인
    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });


    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    // 2. 메인 페이지 접속
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    sleep(0.5);

    // 3. 경로 검색 페이지 이동
    // - 페이지 로드 시 역 정보 조회
    let stationsInfo = http.get(`${BASE_URL}/stations`, authHeaders).json();
    check(stationsInfo, { 'retrieved stations': (obj) => obj.length != 0 });
    sleep(0.5);

    // 4. 경로 검색
    let findPathInfo = http.get(`${BASE_URL}/paths?source=3&target=4`, authHeaders).json();
    check(findPathInfo, { 'retrieved path': (obj) => obj.stations.length != 0 });
};