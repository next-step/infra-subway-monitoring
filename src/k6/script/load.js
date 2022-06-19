import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 17 },
        { duration: '3m', target: 17 },
        { duration: '11m', target: 51 },
        { duration: '11m', target: 51 },
        { duration: '3m', target: 17 },
        { duration: '1m', target: 17 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'https://wtc-tyakamyz.p-e.kr';
const USERNAME = 'tyakamyz@naver.com';
const PASSWORD = 'wtc123';

export default function ()  {
    // 메인 페이지 접속
    mainPage();

    // 로그인
    let token = login();

    // 나의 정보 수정
    modifyMemberPage(token);

    // 경로 검색
    pathPage(100, 105);

    sleep(1);
};

function mainPage() {
    let mainRes = http.get(`${BASE_URL}`);
    check(mainRes, {
        'mainRes successfully': (resp) => resp.status == 200
    });
}

function login() {
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

    return loginRes.json('accessToken');
}

function modifyMemberPage(token) {

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 32
    });

    var params = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    let modifyMemberRes = http.put(`${BASE_URL}/members/me`, payload, params);
    check(modifyMemberRes, {
        'modifyMemberRes successfully': (response) => response.status === 200
    });
}

function pathPage(source, target) {
    let pathRes = http.get(BASE_URL+'/path?source=' + source + '&target=' + target);
    check(pathRes, {
        'pathRes successfully': (resp) => resp.status == 200
    } );
}
