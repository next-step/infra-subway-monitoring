import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',

    thresholds: {
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
