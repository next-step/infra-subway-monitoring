import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 60 },
        { duration: '2m', target: 60 },
        { duration: '10s', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

const BASE_URL = 'https://mwkwon-service.kro.kr/';

export default function () {

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let pathsRes = http.get(`${BASE_URL}/paths/?source=5&target=29`, params);

    check(pathsRes, {
        'path in successfully': (resp) => resp.status === 200,
        'correct distance' : (resp) => resp.json('distance') === 100
    });
    sleep(1);
};