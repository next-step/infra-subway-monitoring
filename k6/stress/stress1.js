import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 20 },
        { duration: '1m', target: 20 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.2s
    },
};

const BASE_URL = 'https://nextstep.paki1019.o-r.kr/';
const USERNAME = 'paki1019@gmail.com';
const PASSWORD = 'test123!';

export default function ()  {
    main();
    const accessToken = login();
    me(accessToken);
    path();
    pathSearch();
    sleep(1);
};

function main() {
    let response = http.get(`${BASE_URL}`);

    check(response, {
        '메인 페이지': (response) => response.status === 200,
    });
}

function login() {
    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let response = http.post(`${BASE_URL}/login/token`, payload, params);

    check(response, {
        '로그인': (resp) => resp.json('accessToken') !== '',
    });
    return response.json('accessToken')
}

function me(accessToken) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { '내 정보 조회': (obj) => obj.id != 0 });
}

function path() {
    let response = http.get(`${BASE_URL}/path`);

    check(response, {
        '경로 검색 페이지': (response) => response.status === 200,
    });
}

function pathSearch() {
    let response = http.get(`${BASE_URL}/paths/?source=4&target=130`);

    check(response, {
        '경로 검색': (response) => response.status === 200,
    });
}
