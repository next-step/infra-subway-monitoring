import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10m',
    thresholds: {
        http_req_duration: ['p(99)<200'],
    },
};

const BASE_URL = 'https://mirrors89.p-e.kr/';

export default function ()  {
    let mainUrl = http.get(`${BASE_URL}`);
    check(mainUrl, { 'is status 200': (r) => r.status === 200});
    sleep(1);
};