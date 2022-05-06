import http from 'k6/http';
import {check, sleep} from 'k6';
import {Counter} from "k6/metrics";

const avgVuser = 20;
const maxVuser = 1200;

export let options = {
    stages: [
        {duration: '40s', target: avgVuser}, // ramp up from 0 to average
        {duration: '160s', target: maxVuser}, // average to max
        {duration: '20s', target: maxVuser}, // max
    ],
    thresholds: {
        http_req_duration: ['p(99)<500'], // 99% of requests must complete below 0.2s
    },
};

const BASE_URL = 'http://ljh0326.p-e.kr:8080';

export const errorRate = new Counter("errors");

export default function () {

    const payload = JSON.stringify({
        name: Math.random()
    });

    const params = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjUxNzM5ODQwLCJleHAiOjE2NTE3NDM0NDB9.quYLV7ygE2CZUcJx4t8k1JFEpzcTd-IsQ6GcZexzkKI'
        },
    };

    const response = http.post(`${BASE_URL}/stations`, payload, params);
    const isOk = check(response, {'status is 201': (r) => r.status == 201});
    if (!isOk) {
        errorRate.add(!isOk, {errorType: "edit station"})
    }

    sleep(1);
};