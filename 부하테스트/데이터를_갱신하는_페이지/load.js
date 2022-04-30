import http from 'k6/http';
import {check, sleep} from 'k6';
import { Counter } from "k6/metrics";

const vUserOnAverageTraffic = (23 * (1 * 1)) / 1;
const vUserOnMaxTraffic = (230 * (1 * 1)) / 1;

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

    const editPageRes = http.get(`${BASE_URL}/members/me`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb29uZ2phbW1AZW1haWwuY29tIiwiaWF0IjoxNjUxMzMyNzk1LCJleHAiOjE2NTEzMzYzOTV9.mDetzkTGL7f0bKZ7b6OALVkWxNgif4Xmgl0v-ZweWkA'
        },
    });
    const editPageOK = check(editPageRes, {'status is 200': (r) => r.status == 200});
    if (!editPageOK) {
        errorRate.add(!editPageOK, {errorType: "edit member page"})
    }


    const payload = {age: 20, email: 'soongjamm@email.com', password: '1234'};
    const editRes = http.put(`${BASE_URL}/members/me`, JSON.stringify(payload),  {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb29uZ2phbW1AZW1haWwuY29tIiwiaWF0IjoxNjUxMzMyNzk1LCJleHAiOjE2NTEzMzYzOTV9.mDetzkTGL7f0bKZ7b6OALVkWxNgif4Xmgl0v-ZweWkA'
        },
    });
    const editOK = check(editRes, {'status is 200': (r) => r.status == 200});
    if (!editOK) {
        errorRate.add(!editOK, {errorType: "edit member"})
    }

    sleep(1);
};

