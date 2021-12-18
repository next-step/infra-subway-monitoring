import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 300,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com';
const USERNAME = 'lovethefeel@test.com';
const PASSWORD = '1234';

export default function () {
    const before = new Date().getTime();
    const T = 2;

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
    http.get(`${BASE_URL}/path`, authHeaders);

    const after = new Date().getTime();
    const diff = (after - before) / 1000;
    const remainder = T - diff;
    check(remainder, {'reached request rate': remainder > 0});
    if (remainder > 0) {
        sleep(remainder);
    } else {
        console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
    }
};
