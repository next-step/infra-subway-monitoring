import http from 'k6/http';
import {check, group, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100},
        { duration: '1m', target: 100},
        { duration: '30s', target: 900},
        { duration: '1m', target: 900},
        { duration: '30s', target: 1800},
        { duration: '1m', target: 1800},
        { duration: '30s', target: 2700},
        { duration: '1m', target: 2700},
        { duration: '30s', target: 0},
    ],

    thresholds: {
        http_req_duration: ['p(99)<500'],
    },
};

const BASE_URL = 'https://wangkdk.kro.kr'

export default function () {

    let response = http.get(`${BASE_URL}`);
    check(response, { 'lending page': (res) => res.status === 200});
    sleep(1);
};
