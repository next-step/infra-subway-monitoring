// smoke.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m', // 부하 유지 시간

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99%  of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://limhangyeol.kro.kr/';
const USERNAME = 'limhangyeol@nextstep.kr';
const PASSWORD = 'qwer1234';

export default function () {
    main();
    pathSearch();
    login();
};

function main() {
    let response = http.get(BASE_URL);

    check(response, {
        'main page 200 ok': (response) => response.status == 200
    });
}

function pathSearch() {
    // https://limhangyeol.kro.kr/paths/?source=100&target=167
    let pathSearchResponse = http.get(`${BASE_URL}/paths/?source=100&target=167`);

    check(pathSearchResponse, {
        'search path': (response) => response.status == 200
    });

    sleep(1);
}

function login() {
    let loginApi = `${BASE_URL}/login/token`;

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginResponse = http.post(loginApi, payload, params);

    check(loginResponse, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });
}