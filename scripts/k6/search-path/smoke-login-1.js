import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';
import { login } from '../common/login.js';

export const options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.2s
    },
};

const BASE_URL = 'https://mand2-infra-subway.kro.kr';

export default () => {
    // 로그인 + 경로검색 시나리오로 작성.
    // login 모듈만 공통으로 빼서 import.
    const token = login()
    searchPath(240, 250, token)
};

const searchPath = (from, to, token) => {
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };
    const url = `${BASE_URL}/path/?source=${from}&target=${to}`;
    const response = http.get(url, params)
    check(response, {
        'search path in successfully': (response) => response.status === 200
    });

    sleep(1);
}
