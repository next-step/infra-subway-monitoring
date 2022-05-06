import http from 'k6/http';
import {check, sleep} from 'k6';
import {Counter} from "k6/metrics";

const avgVusers = 16;
const maxVusers = 161;

export let options = {
    stages: [
        {duration: '20s', target: avgVusers}, // ramp up from 0 to average
        {duration: '180s', target: avgVusers}, // average
        {duration: '30s', target: maxVusers}, // average to max
        {duration: '240s', target: maxVusers}, // max
        {duration: '20s', target: avgVusers}, // ramp down from max to average
        {duration: '20s', target: avgVusers}, // average
        {duration: '20s', target: 0}, // ramp down from average to 0 user
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