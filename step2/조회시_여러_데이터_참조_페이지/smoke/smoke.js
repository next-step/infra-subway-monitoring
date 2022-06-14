import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://ssonsh-next-step.p-e.kr';

export default function ()  {
    let 경로조회_response = 경로조회_요청(3, 85);
    경로조회_성공(경로조회_response);
};

export function 경로조회_요청 (sourceId, targetId) {
    return http.get(`${BASE_URL}/paths?source=` + sourceId + `&target=` + targetId);
}

export function 경로조회_성공(경로조회_response) {
    check(경로조회_response, {
        '경로조회 요청 결과 ' : (response) => response.json('stations').length > 0
    });
}
