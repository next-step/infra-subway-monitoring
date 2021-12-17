import http from 'k6/http';
import {check, sleep} from 'k6';

/*
T = (R * http_req_duration) = 왕복시간이 0.5, 지연시간이 1초 = 1 / 0.5 = 2 (T)
R = 요청수 = **1**
최소 VUser = (평균 rps * T) / R  = 6 * (2) / 1 ~= 12
최대 VUser = (최대 rps * T) / R  = 62 * (2) / 1 ~= 124
* */

export const options = {
    stages: [
        {duration: '1m', target: 12},
        {duration: '5m', target: 124},
        {duration: '10s', target: 0},
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};


const BASE_URL = 'https://hidy.kro.kr';

export default function () {
    const mainResponse = http.get(`${BASE_URL}`);
    check(mainResponse, {
        'load main page': response => response.status === 200
    });
    sleep(1);
}

