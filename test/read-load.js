import http from 'k6/http';
import {check, sleep} from 'k6';
import {Counter} from "k6/metrics";

const avgVuser = 279;
const maxVuser = 1116;

export let options = {
    stages: [
        {duration: '20s', target: avgVuser}, // ramp up from 0 to average
        {duration: '180s', target: avgVuser}, // average
        {duration: '30s', target: maxVuser}, // average to max
        {duration: '240s', target: maxVuser}, // max
        {duration: '20s', target: avgVuser}, // ramp down from max to average
        {duration: '20s', target: avgVuser}, // average
        {duration: '20s', target: 0}, // ramp down from average to 0 user
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.2s
    },
};

const BASE_URL = 'http://ljh0326.p-e.kr:8080';

export const errorRate = new Counter("errors");

export default function () {


    const mainResponse = http.get(`${BASE_URL}`);
    const isMainOk = check(mainResponse, {'status is 200': (r) => r.status == 200});
    if (!isMainOk) {
        errorRate.add(!isMainOk, {errorType: "main page"})
    }

    const pathResponse = http.get(`${BASE_URL}/path`);
    const isPathOk = check(pathResponse, {'status is 200': (r) => r.status == 200});
    if (!isPathOk) {
        errorRate.add(!isPathOk, {errorType: "path page"})
    }

    const pathSearchResponse = http.get(`${BASE_URL}/paths/?source=3&target=7`);
    const isPathSearchOk = check(pathSearchResponse, {'status is 200': (r) => r.status == 200});
    if (!isPathSearchOk) {
        errorRate.add(!isPathSearchOk, {errorType: "path search"})
    }

    sleep(1);
};