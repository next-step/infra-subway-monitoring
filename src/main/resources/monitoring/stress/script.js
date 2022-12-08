import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '1m', target: 100},
        {duration: '2m', target: 150},
        {duration: '4m', target: 200},
        {durtaion: '2m', target: 150},
        {durtaion: '1m', target: 100},
        {duration: '10s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'],
    },
};

const BASE_URL = 'https://eunveloper.kro.kr/';
const USERNAME = 'eune6460@gmail.com';
const PASSWORD = 'password';

export default function ()  {
    //  사용자가 로그인을 한다.
    const token = loginMember();

    // 사용자가 경로검색 페이지에 접근한다.
    accessSearchPathPage();

    // 사용자가 경로를 검색한다.
    searchPath(token);
}

function loginMember() {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    let response = http.post(`${BASE_URL}/login/token`, payload, params);
    check(response, {
        'login successfully': (resp) => resp.json('accessToken') !== '',
    });

    return `Bearer ${response.json('accessToken')}`
}

function accessSearchPathPage() {
    const response = http.get(`${BASE_URL}/path`);
    check(response, {
        'acess search path  page status 200': (res) => res.status === 200
    });
}

function searchPath(token) {
    var params = {
        headers: {
            Authorization: token
        },
    };

    let response = http.get(`${BASE_URL}/paths/?source=4&target=28`, params);
    check(response, {
        'search path status 200': (res) => res.status === 200
    });
}
