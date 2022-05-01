import http from 'k6/http';
import {check, sleep} from 'k6';
import { Counter } from "k6/metrics";

const vUserOnAverageTraffic = (23 * (3 * 1)) / 1;
const vUserOnMaxTraffic = (69 * (3 * 1)) / 1;

export let options = {
    stages: [
        {duration: '20s', target: vUserOnAverageTraffic}, // ramp up from 0 to average
        {duration: '40s', target: vUserOnAverageTraffic}, // average
        {duration: '20s', target: vUserOnMaxTraffic}, // average to max
        {duration: '40s', target: vUserOnMaxTraffic}, // max
        {duration: '20s', target: vUserOnAverageTraffic}, // ramp down from max to average
        {duration: '20s', target: vUserOnAverageTraffic}, // average
        {duration: '20s', target: 0}, // ramp down from average to 0 user
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1.0s
    },
};


const BASE_URL = 'https://soongjamm-infra-web.p-e.kr/';

export const errorRate = new Counter("errors");

export default function () {

    const homeRes = http.get(`${BASE_URL}`);
    const homeOK = check(homeRes, {'status is 200': (r) => r.status == 200});
    if (!homeOK) {
        errorRate.add(!homeOK, {errorType: "main page"})
    }

    const pathRes = http.get(`${BASE_URL}/path`);
    const pathOK = check(pathRes, {'status is 200': (r) => r.status == 200});
    if (!pathOK) {
        errorRate.add(!pathOK, {errorType: "path page"})
    }

    const pathsRes = http.get(`${BASE_URL}/paths/?source=3&target=7`);
    const pathsOK = check(pathsRes, {'status is 200': (r) => r.status == 200});
    if (!pathsOK) {
        errorRate.add(!pathsOK, {errorType: "paths page"})
    }

    sleep(1);
};
