import http from 'k6/http';
import {check} from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<2000'],
    },
};

const BASE_URL = 'https://anydomainpro.kro.kr/';
const USERNAME = 'k6@test.com';
const PASSWORD = '1234';

export default function () {
    let loginPayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, loginPayload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    let updatePayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30
    });

    let updateRes = http.put(`${BASE_URL}/members/me`, updatePayload, authHeaders);
    check(updateRes, {
        'updated member': (res) => res.status === 200
    });
}
