import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<900'], // 99% of requests must complete below 0.9s
    },
};

const BASE_URL = 'https://jerry92k-subway.n-e.kr/';

export default function ()  {

    let response = http.get(`${BASE_URL}/`);
    check(response, { 'is status 200(ok)': (r) => r.status===200 });
    sleep(1);
};