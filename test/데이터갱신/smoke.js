import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://jun731.p-e.kr/';

export default function ()  {

    var payload = JSON.stringify({
        name: Date.now()
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let stationsRes = http.post(`${BASE_URL}/stations`, payload, params);

    check(stationsRes, {
        'stations in successfully': (resp) => resp.json('id') !== '',
    });

    sleep(1);
};
