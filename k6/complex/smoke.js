import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

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
