import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5', target: 1 },
        { duration: '10s', target: 5 },
        { duration: '25s', target: 50 },
        { duration: '10s', target: 5 },
        { duration: '5', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://ssonsh-next-step.p-e.kr';

export default function ()  {
    check(메인페이지_요청(), { '메인페이지 ': (response) => response != '',});
};

export function 메인페이지_요청 () {
    let response = http.get(`${BASE_URL}`);
    sleep(1);
    return response;
}
