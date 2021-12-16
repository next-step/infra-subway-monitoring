import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://chapitak.kro.kr';

export default function ()  {

    let selectRes = http.get(`${BASE_URL}/paths?source=3&target=2`);

    check(selectRes, {
        'selected successfully': (resp) => resp.status === 200,
    });

    sleep(1);
};
