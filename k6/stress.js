import http from 'k6/http';
import { check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '10m', target: 100 },
        { duration: '10m', target: 200 },
        { duration: '10m', target: 150 },
        { duration: '10m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://kimjaehan.kro.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = 'test1';

export default () => {

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
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });

    let linesRes = http.get(`${BASE_URL}/lines/1`).json();
    check(linesRes, { 'retrieved lines': (obj) =>  obj.id === 1 });

    sleep(1);
};
