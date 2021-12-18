import http from 'k6/http';
import {check, group, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 9},
        { duration: '30s', target: 9},
        { duration: '5s', target: 18},
        { duration: '30s', target: 18},
        { duration: '5s', target: 27},
        { duration: '30s', target: 27},
        { duration: '5s', target: 36},
        { duration: '30s', target: 36},
        { duration: '30s', target: 0},
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://wangkdk.kro.kr'

export default function () {

    let response = http.get(`${BASE_URL}/paths?source=103&target=97`).json();
    check(response, { 'find paths': (res) => res.stations.length > 0});
    sleep(1);
};
