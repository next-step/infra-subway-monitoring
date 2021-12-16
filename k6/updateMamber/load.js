import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        {duration: '5s', target: 50},
        {duration: '10s', target: 300},
        {duration: '10s', target: 300},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'],
    },
};

const BASE_URL = 'http://lsm7179-alb-1556721989.ap-northeast-2.elb.amazonaws.com';
const USERNAME = 'sml7179@naver.com';
const PASSWORD = '1234';

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginResponse = http.post(`${BASE_URL}/login/token`, JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    }), params);
    check(loginResponse, {
        'logged in successfully': (response) => response.status === 200,
        'logged in token': (response) => response.json('accessToken') !== '',
    });

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginResponse.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };

    const updatedObject = http.put(`${BASE_URL}/members/me`, JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 27
    }), authHeaders);
    check(updatedObject, {'updated successfully': (response) => response.status === 200});

    sleep(1);
}