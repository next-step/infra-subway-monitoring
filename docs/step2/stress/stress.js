import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 41 },
        { duration: '2m', target: 41 },
        { duration: '2m', target: 82 },
        { duration: '2m', target: 82 },
        { duration: '2m', target: 123 },
        { duration: '2m', target: 123 },
        { duration: '2m', target: 164 },
        { duration: '2m', target: 164 },
        { duration: '4m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<100']
    },
};

const BASE_URL = 'https://heowc.kro.kr';
const USERNAME = 'heowc1992@gmail.com';
const PASSWORD = 'password';

export default function ()  {
    // 메인 페이지 접속
    staticPage('', 'access main page');

    // 로그인 페이지 접속
    staticPage('login', 'access login page');

    // 로그인 요청
    var accessToken = login(USERNAME, PASSWORD);
    // 경로 조회 페이지 접속
    staticPage('path', 'access paths page');

    // 지하철역 목록 조회
    findStations();

    // 경로 검색 조회
    findPath();

    // 즐겨찾기 목록 조회
    findFavorites(accessToken);

    sleep(1);
};

function staticPage(path, desc) {
    var page = http.get(`${BASE_URL}/${path}`);
    var obj = {};
    obj[desc] = (resp) => resp.status === 200;
    check(page, obj);
}

function login(email, password) {
    var payload = JSON.stringify({
        email: email,
        password: password,
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

    return loginRes.json('accessToken');
}

function findStations() {
    let loginRes = http.get(`${BASE_URL}/stations`);

    check(loginRes, {
        'retrieved stations': (resp) => resp.status === 200,
    });
}

function findPath() {
    let loginRes = http.get(`${BASE_URL}/paths?source=113&target=100`);

    check(loginRes, {
        'retrieved path': (resp) => resp.status === 200,
    });
}

function findFavorites(accessToken) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let loginRes = http.get(`${BASE_URL}/favorites`, authHeaders);

    check(loginRes, {
        'retrieved favorites': (resp) => resp.status === 200,
    });
}
