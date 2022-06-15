import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

const BASE_URL = 'https://subway.geunhwanlee.p-e.kr';

export default function ()  {
    let source = '257';
    let target = '1';
    let response = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);

    check(response, {
        'response code 200': (res) => res.status === 200
    });
    sleep(1);
};
