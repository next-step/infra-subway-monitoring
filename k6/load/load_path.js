import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '20s', target: 200 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};


const BASE_URL = 'https://dolilu.kro.kr';

export default function ()  {
    let pathRes = 경로_조회_요청();
    경로_조회_확인됨(pathRes, 23);

    sleep(1);
};

export function 경로_조회_요청() {
    return http.get(`${BASE_URL}/paths` + "?source=1&target=2").json();
}

export function 경로_조회_확인됨(pathRes, distance){
    check(pathRes, {
        'find path successfully': (resp) => resp['distance'] === distance,
    });
}