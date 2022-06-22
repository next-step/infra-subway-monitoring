import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://yang-infra-subway.p-e.kr';
const USERNAME = 'test@gmail.com';
const PASSWORD = '1234';

export default function ()  {
    main();
    let jwt = login();
    findLines(1);
};

function main(){
    check(http.get(`${BASE_URL}/`),{'main': (res)=> res.status ===200});
}

function login(){
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

function findLines(lineId) {
    let res = http.get(`${BASE_URL}/lines/${lineId}`);
    check(res, { 'find line success': (res) => res.status === 200 });
}
