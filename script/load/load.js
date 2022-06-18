import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target:  20 },
        { duration: '3m', target:  80 },
        { duration: '22m', target: 80 },
        { duration: '4m', target:  30 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://www.tj3828.p-e.kr';
const USERNAME = 'email@email.com';
const PASSWORD = 'password';

export default function ()  {

    mainPage();

    let token = login();
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    myInfo(authHeaders);
    pathFinderPage();
    pathFind();


    sleep(1);
};

function mainPage() {
    let main = http.get(BASE_URL);
    check(main, {"메인 페이지 접근" : (resp) => resp.status === 200});
}

function login() {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {headers: { 'Content-Type': 'application/json' }};

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    check(loginRes, {"로그인 성공" : (resp) => resp.json('accessToken') !== ''});

    return loginRes.json('accessToken');
}

function myInfo(authHeaders) {
    let myInfo = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myInfo, { '나의 정보 조회' : (obj) => obj.id !== 0 });
}

function pathFinderPage() {
    let path = http.get(BASE_URL+'/path');
    check(path, { '경로 조회 검색 페이지 접근': (resp) => resp.status === 200} );
}

function pathFind() {
    let pathFind = http.get(BASE_URL+'/path?source=5&target=6');
    check(pathFind, { '경로 조회 검색 성공': (resp) => resp.status === 200} );
}
