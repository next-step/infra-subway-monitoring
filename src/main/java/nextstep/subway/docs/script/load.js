import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        {duration: '30s', target: 6},
        {duration: '30s', target: 12},
        {duration: '30s', target: 18},
        {duration: '30s', target: 18},
        {duration: '30s', target: 12},
        {duration: '30s', target: 6},
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://www.yong2ss.kro.kr/';
const USERNAME = 'yong2ss@nextstep.com';
const PASSWORD = '1234';

export default function ()  {
    toMain();
    path();
    const accessToken = loginToken();
    findPath();
};

function toMain() {
    let res = http.get(`${BASE_URL}`);
    check(res, {
        'Main status is 200': (r) => r.status === 200
    });
}

function loginToken() {
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });
    let params = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    let res = http.post(`${BASE_URL}/login/token`, payload, params);
    check(res, {
        "login status is 200": (resp) => resp.json("accessToken") !== "",
    });

    return res.json("accessToken");
}

function path() {
    let res = http.get(`${BASE_URL}/path`);
    check(res, {
        'Path status is 200': (r) => r.status === 200
    });
}

function findPath() {
    let res = http.get(`${BASE_URL}/paths?source=1&target=2`);
    check(res, {
        'status is 200': (r) => r.status === 200
    });
}