import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: 5,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://devsigner9920.n-e.kr';

export default function () {
    let smoke_test = http.get(`${BASE_URL}`);

    check(smoke_test, {
        'smoke test': (resp) => resp.status == 200,
    });

}
