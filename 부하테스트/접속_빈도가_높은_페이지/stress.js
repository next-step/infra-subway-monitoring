import http from 'k6/http';
import {check, sleep} from 'k6';
import { Counter } from "k6/metrics";

export let options = {
    stages: [
        {duration: '20s', target: 100},
        {duration: '40s', target: 100},
        {duration: '20s', target: 300},
        {duration: '40s', target: 300},
        {duration: '20s', target: 500},
        {duration: '40s', target: 500},
        {duration: '20s', target: 700},
        {duration: '40s', target: 700},
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1.0s
    },
};

const BASE_URL = 'https://soongjamm-infra-web.p-e.kr/';

export const errorRate = new Counter("errors");

export default function () {

    let homeRes = http.get(`${BASE_URL}`);

    let ok = check(homeRes, {'status is 200': (r) => r.status == 200});
    if (!ok) {
        errorRate.add(false);
    }
    sleep(1);
};