import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '5m', target: 20 },
        { duration: '5m', target: 40 },
        { duration: '5m', target: 70 },
        { duration: '5m', target: 60 },
        { duration: '5m', target: 30 },
        { duration: '5m', target: 10 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://piopoi.kro.kr';
const USERNAME = 'test@email.com';
const PASSWORD = 'password';

export default function () {
    //메인페이지 접속
    accessMainPage();

    //로그인
    let token = login();

    //회원 정보 조회
    getMemberInfo(token);

    //회원 정보 수정
    updateMemberInfo(token);

    //즐겨찾기 조회
    getFavorites(token);

    sleep(1);
}

function accessMainPage() {
    let response = http.get(`${BASE_URL}`);
    check(response, {
        'access main page successfully': (res) => res.status === 200
    });
}

function login() {
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });
    let params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let response = http.post(`${BASE_URL}/login/token`, payload, params);
    check(response, {
        'logged in successfully': (resp) => resp.json('accessToken') !== ''
    });
    return response.json('accessToken');
}

function getMemberInfo(token) {
    let params = {
        headers: {
            Authorization: `Bearer ` + token
        }
    };
    let response = http.get(`${BASE_URL}/members/me`, params).json();
    check(response, {'get member info successfully': (obj) => obj.id != 0});
    sleep(1);
}

function updateMemberInfo(token) {
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30
    });
    let params = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ` + token
        }
    }
    let response = http.post(`${BASE_URL}/members/me`, payload, params);
    check(response, {
        'member info update successfully': (resp) => resp.json('accessToken') !== ''
    });
}

function getFavorites(token) {
    let params = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ` + token
        }
    }
    let response = http.get(`${BASE_URL}/favorites`, params).json();
    check(response, {
        'get favorites successfully': (obj) => obj.id != 0
    });
}

