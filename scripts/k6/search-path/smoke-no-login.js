import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export const options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.2s
    },
};

const BASE_URL = 'https://mand2-infra-subway.kro.kr';
const USERNAME = 'test1@test.com';
const PASSWORD = '1234';

export default () => {
    // 로그인 하지 않고 경로검색 할 수 있음. 로그인 없는 시나리오로 작성.
    searchPath(240, 250)
};

const searchPath = (from, to) => {
    const url = `${BASE_URL}/paths/?source=${from}&target=${to}`;
    const response = http.get(url)
    check(response, {
        'search path in successfully': (response) => response.status === 200
    });

    sleep(1);
}
