import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 150 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 300 },
        { duration: '1m', target: 300 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 600 },
        { duration: '1m', target: 700 },
        { duration: '1m', target: 500 },
        { duration: '1m', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1s
    },
};

const BASE_URL = 'https://toughchb.kro.kr';
const USERNAME = 'toughchb@gmail.com';
const PASSWORD = 'toughchb';

export default function ()  {
    // 메인 페이지
    mainPage();

    // 로그인
    let token = login();

    // 나의 정보 수정
    changeMember(token);

    // 경로 검색
    getPath(15, 27);

    sleep(1);
};

function mainPage() {
    let mainRes = http.get(`${BASE_URL}`);
    check(mainRes, {
        'mainPage successfully': (resp) => resp.status == 200
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

function changeMember(token) {

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

    let changeMemberRes = http.put(`${BASE_URL}/members/me`, payload, params);
    check(changeMemberRes, {
        'changeMember successfully': (response) => response.status === 200
    });
}

function getPath(source, target) {
    let pathRes = http.get(BASE_URL+'/path?source=' + source + '&target=' + target);
    check(pathRes, {
        'getPath successfully': (resp) => resp.status == 200
    } );
}
