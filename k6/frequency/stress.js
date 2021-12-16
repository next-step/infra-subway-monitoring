import http from 'k6/http';
import {check, group, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 50},
        { duration: '10s', target: 100},
        { duration: '10s', target: 150},
        { duration: '10s', target: 200},
        { duration: '10s', target: 250},
        { duration: '10s', target: 300},
        { duration: '10s', target: 0},
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
