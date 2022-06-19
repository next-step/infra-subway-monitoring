import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://handh.kro.kr';
const USERNAME = 'nextstep@nextstep.camp';
const PASSWORD = 'password';

export default function ()  {

    goToMainPage();

    goToLoginPage();

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


    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    sleep(1);
};

function goToMainPage() {
    const res = http.get(BASE_URL);

    const checkRes = check(res, {
        'goToMainPage() status is 200': (r) => r.status === 200
    });
}

function goToLoginPage() {
    const res = http.get(`${BASE_URL}/login`);

    const checkRes = check(res, {
        'goToLoginPage() status is 200': (r) => r.status === 200
    });
}
