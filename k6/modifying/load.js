import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        {duration: '5s', target: 50},
        {duration: '20s', target: 200},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://jsyang-dev.kro.kr/';
const USERNAME = 'mycat83@gmail.com';
const PASSWORD = '1234';

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginRes = http.post(`${BASE_URL}/login/token`, JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    }), params);
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    const updatedObject = http.put(`${BASE_URL}/members/me`, JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 30
    }), authHeaders).json();
    check(updatedObject, {'updated member': obj => obj.id !== 0});

    sleep(1);
}
