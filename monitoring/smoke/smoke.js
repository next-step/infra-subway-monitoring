import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '60s',

  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 0.1s
  },
};

const BASE_URL = 'https://sangjaeoh.p-e.kr/';
const USERNAME = 'sangjaeoh@naver.com';
const PASSWORD = 'nextstep';


export default function ()  {
    main();

    const authHeaders = login();
    retrieveMember(authHeaders);

    path();
    findPath(authHeaders);

    sleep(1);
}


function main() {
    const response = http.get(BASE_URL);

    check(response, {
        'main status 200': (res) => res.status === 200
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

    const response = http.post(`${BASE_URL}/login/token`, payload, params);

    check(response, {
        'logged in successfully': (res) => res.json('accessToken') !== '',
    });

    return {
        headers: {
            Authorization: `Bearer ${response.json('accessToken')}`,
        },
    };
}

function retrieveMember(authHeaders) {
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
}

function path() {
    const response = http.get(`${BASE_URL}/path`);

    check(response, {
        'path status 200': (res) => res.status === 200
    });
}

function findPath(authHeaders) {
    const response = http.get(`${BASE_URL}/path?source=7&target=395`, authHeaders);

    check(response, {
        'find path status 200': (res) => res.status === 200
    });
}