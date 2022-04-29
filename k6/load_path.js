import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '3m', target: 12 },
        { duration: '3m', target: 50 },
        { duration: '3m', target: 50 },
        { duration: '3m', target: 110 },
        { duration: '3m', target: 110 },
    ],
    thresholds: {
        http_req_duration: ['p(95) < 50', 'p(99) < 75'],
    },
};

const BASE_URL = 'https://shineoov.p-e.kr';
const SOURCE = 1; // 출발역: 녹양
const TARGET = 63; // 도착역: 속사

export default () => {

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.get(`${BASE_URL}/paths?source=${SOURCE}&target=${TARGET}`, params);

    check(response, { 'http status code 200': res => res.status === 200 });

    check(response, { 'stations is json path exist ': (obj) => obj.json()["stations"] != null});

    sleep(1)
};
