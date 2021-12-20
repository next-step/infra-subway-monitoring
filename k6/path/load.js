import http from 'k6/http';
import {check, sleep} from 'k6';

/*
T = (R * http_req_duration) = 왕복시간이 0.5, 지연시간이 1초 = 1 / 0.5 = 2 (T)
R = 요청수 = **2**
최소 VUser = (평균 rps * T) / R  = 6 * (2) / 2 ~= 6
최대 VUser = (최대 rps * T) / R  = 62 * (2) / 2 ~= 62
* */

export const options = {
    stages: [
        {duration: '1m', target: 6},
        {duration: '5m', target: 62},
        {duration: '10s', target: 0},
    ],
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://hidy.kro.kr';

export default function () {
    // 지하철 역 조회
    const stationsResponse = http.get(`${BASE_URL}/stations`);
    check(stationsResponse, {
        'retrieved stations': (res) => res.status === 200,
    });

    // 역 사이 경로 검색
    const pathResponse = http.get(`${BASE_URL}/paths/?source=1&target=3`);
    check(pathResponse, {'find path': (res) => res.status === 200});
    sleep(1);
}
