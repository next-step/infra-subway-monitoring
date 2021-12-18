import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 300 },
        { duration: '2m', target: 300 },
        { duration: '1m', target: 500 },
        { duration: '2m', target: 500 },
        { duration: '5m', target: 0 },
    ],
};

const BASE_URL = 'https://jerry92k-subway.n-e.kr/';
const USERNAME = 'test@gmail.com';
const PASSWORD = '1234';

export default function ()  {

    var loginPayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
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
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };


    // station들 범위 내에서 id 랜덤 선택
    let source =24
    let target =17

    http.get(`${BASE_URL}/paths?source=${source}&target=${target}`, authHeaders);
    sleep(1);
};