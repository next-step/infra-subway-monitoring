import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10m', target: 23 },
        { duration: '20m', target: 23 },
        { duration: '10m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://parkeeseul.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = 'test';

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


    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });


    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    // 홈페이지
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });

    // 노선 생성
    let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    var createLinePayload = JSON.stringify({
        name : uniqueId,
        color: "red",
        upStationId : 1,
        downStationId : 2,
        distance: 100,
    });
    let createLineRes = http.post(`${BASE_URL}/lines`, createLinePayload, params);
    check(createLineRes, { 'create line': (obj) => obj.id != 0 });
    let location = createLineRes.headers.Location;

    // 노선 업데이트
    var updateLinePayload = JSON.stringify({
        name : createLineRes.name,
        color: "yellow",
        upStationId : 1,
        downStationId : 2,
        distance: 100,
    });
    let updateLineRes = http.put(`${BASE_URL}${location}`, updateLinePayload, params);

    // 즐겨 찾기 조회
    let myFavorites = http.get(`${BASE_URL}/favorites`, authHeaders).json();
    check(myFavorites, { 'myFavorites line': (obj) => obj.length != 0 });

    sleep(1);
};