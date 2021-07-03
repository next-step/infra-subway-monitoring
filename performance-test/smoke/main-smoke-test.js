import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

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


    let pathsRes = http.get(`${BASE_URL}`, params);

    check(pathsRes, {
        'main in successfully': (resp) => resp.status === 200
    });
    sleep(1);
};