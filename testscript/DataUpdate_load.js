import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '1m', target: 175},
        {duration: '2m', target: 175},
        {duration: '10s', target: 0}
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://dacapolife87-test.n-e.kr/';
const USERNAME = 'test@email.com';
const PASSWORD = 'password';

export default function ()  {


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

    let updateBody = {
        email: "test@email.com",
        password: "1234",
        age: 30
    };
    let myObjects = http.put(`${BASE_URL}/members/me`, updateBody, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
    sleep(1);

};
