import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 140},
        { duration: '10s', target: 160},
        { duration: '5s', target: 180},
        { duration: '10s', target: 200},
        { duration: '5s', target: 220},
        { duration: '10s', target: 240},
        { duration: '5s', target: 0}
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500']
    },
};

const BASE_URL = 'https://www.woowabros.o-r.kr';
const USERNAME = 'woowabros@gmail.com';
const PASSWORD = 'woowabros';

export default () => {

    // login
    let loginUrl = `${BASE_URL}/login/token`;
    let loginPayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD
    });
    let loginParams = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let loginResponse = http.post(loginUrl, loginPayload, loginParams);
    check(loginResponse, {
        'logged in successfully': (response) => response.json('accessToken') !== '',
    });

    // update Member
    let memberUpdateUrl = `${BASE_URL}/members/me`;
    let memberUpdateLoad = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 25
    });
    let memberUpdateParam = {
        headers: {
            'Authorization': `Bearer ${loginResponse.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };
    let createLinesResponse = http.put(memberUpdateUrl, memberUpdateLoad, memberUpdateParam);
    check(createLinesResponse, {
        'member update successfully': (response) => response.status == 200
    });
};
