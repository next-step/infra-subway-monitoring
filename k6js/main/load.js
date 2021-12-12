import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 50 },
        { duration: '20s', target: 200 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'],
    },
};

const BASE_URL = 'http://15.164.96.247/';

export default function () {
    let response = http.get(`${BASE_URL}`);
    check(response, {
        'main page': response => response.status === 200
    });

    sleep(1);
}
