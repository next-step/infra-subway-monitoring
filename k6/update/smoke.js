import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<2000'], // 요청의 99%가 2초 미만으로 완료되어야 함
    },
};

const BASE_URL = 'http://don-key-alb-1030470679.ap-northeast-2.elb.amazonaws.com';
const USERNAME = 'don-key@don-key.com';
const PASSWORD = 'password';

export default function () {
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    const accessToken = loginRes.json('accessToken');

    let authHeaders = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    };

    let updatePayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30
    });

    let updateRes = http.put(`${BASE_URL}/members/me`, updatePayload, authHeaders);
    check(updateRes, {
        'update member': (res) => res.status === 200
    });
}
