import http from 'k6/http';
import {check, group, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 9},
        { duration: '20s', target: 26},
        { duration: '5s', target: 0},
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://wangkdk.kro.kr'

export default function () {

    let response = http.get(`${BASE_URL}`);
    check(response, { 'lending page': (res) => res.status === 200});
    sleep(1);
};
