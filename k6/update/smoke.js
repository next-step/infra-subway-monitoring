import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://wangkdk.kro.kr'
const USERNAME = 'email@email.com';
const PASSWORD = '12345';

export default function () {

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let params = {
        headers: {
            'Content-type': 'application/json',
        },
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
            'Content-type': 'application/json'
        },
    };

    let contents = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30
    });

    let response = http.put(`${BASE_URL}/members/me`, contents, authHeaders);
    check(response, {'updated member': (res) => res.status === 200});
    sleep(1);
};
