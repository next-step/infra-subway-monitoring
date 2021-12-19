import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 500 },
        { duration: '20s', target: 500 },
        { duration: '10s', target: 550 },
        { duration: '20s', target: 550 },
        { duration: '10s', target: 600 },
        { duration: '20s', target: 600 },
        { duration: '20s', target: 0 },
    ],
};

const BASE_URL = 'http://jennie267-alb-2134274569.ap-northeast-2.elb.amazonaws.com';
const USERNAME = 'jennie267@email.com';
const PASSWORD = 'jennie267';

export default function ()  {
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
            'Content-Type': 'application/json',
        },
    };
    
    var modifyPayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30
    });
    
    http.put(`${BASE_URL}/members/me`, modifyPayload, authHeaders);
    
    const after = new Date().getTime();
    const diff = (after - before) / 1000;
    const remainder = T - diff;
    check(remainder, { 'reached request rate': remainder > 0 });
    if (remainder > 0) {
        sleep(remainder);
    } else {
        console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
    }
};