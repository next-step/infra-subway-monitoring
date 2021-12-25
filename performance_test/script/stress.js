import http from 'k6/http';
import { check } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 seconds.
        { duration: '20s', target: 300 }, // stay at 500 users for 20 seconds
        { duration: '10s', target: 100 }, // ramp-down to 100 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://devsigner9920.n-e.kr';

export default function () {
    let stress_test = http.get(`${BASE_URL}`);

    check(stress_test, {
        'stress test': (resp) => resp.status == 200,
    });

}
