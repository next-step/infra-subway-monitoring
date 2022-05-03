import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        { duration: '1m', target: 200 }, // stay at 100 users for 10 minutes
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<150'] // 99% of requests must complete below 0.15s
    },
};

const BASE_URL = 'https://loopstudy.p-e.kr';

export default function ()  {

    var payload = JSON.stringify({
        name: Math.random().toString(36).substring(2, 10)
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let stations = http.post(`${BASE_URL}/stations`, payload, params);

    check(stations, {
        'stations in successfully': (resp) => resp.json('id') !== '',
    });
    sleep(1);
};