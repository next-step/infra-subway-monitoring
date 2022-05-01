import http from 'k6/http';
import {check, sleep} from 'k6';
import { Counter } from "k6/metrics";

export let options = {
    stages: [
        {duration: '20s', target: 100},
        {duration: '40s', target: 100},
        {duration: '20s', target: 400},
        {duration: '40s', target: 400},
        {duration: '20s', target: 600},
        {duration: '40s', target: 600},
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
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb29uZ2phbW1AZW1haWwuY29tIiwiaWF0IjoxNjUxMzM2NzAwLCJleHAiOjE2NTEzNDAzMDB9.w5dL2jc_JE5zmvNJvALQr2oMV7I1hfOyFjTM4wlbpgg`
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
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb29uZ2phbW1AZW1haWwuY29tIiwiaWF0IjoxNjUxMzM2NzAwLCJleHAiOjE2NTEzNDAzMDB9.w5dL2jc_JE5zmvNJvALQr2oMV7I1hfOyFjTM4wlbpgg`
        },
    });
    const editOK = check(editRes, {'status is 200': (r) => r.status == 200});
    if (!editOK) {
        errorRate.add(!editOK, {errorType: "edit member"})
    }

    sleep(1);
};
