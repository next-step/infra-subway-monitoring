import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 70, // 1 user looping for 1 minute
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'https://infra-study.p-e.kr/';
const PATH = ''

export default function ()  {
    http.get(`${BASE_URL}${PATH}`)
    sleep(1);
};