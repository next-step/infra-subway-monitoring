import http from 'k6/http';
import {check, sleep} from 'k6';
import {Counter} from "k6/metrics";

const avgVuser = 279;
const maxVuser = 1000;

export let options = {
    stages: [
        {duration: '40s', target: avgVuser}, // ramp up from 0 to average
        {duration: '160s', target: maxVuser}, // average to max
        {duration: '20s', target: maxVuser}, // max
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