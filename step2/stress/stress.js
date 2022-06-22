import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 20 },
        { duration: '10s', target: 50 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 150 },
        { duration: '10s', target: 200 },
        { duration: '10s', target: 250 },
        { duration: '10s', target: 300 },
        { duration: '10s', target: 350 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://yang-infra-subway.p-e.kr';
const USERNAME = 'test@gmail.com';
const PASSWORD = '1234';

export default function ()  {

    main();

    let jwt = login();

    findLine(1);

};

function main() {
    let response = http.get(`${BASE_URL}`)
    check(response, {'access successfully': (res) => res.status === 200})
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

function findLine(lineId) {
    let res = http.get(`${BASE_URL}/lines/${lineId}`);
    check(res, { 'find line success': (res) => res.status === 200 });
}
