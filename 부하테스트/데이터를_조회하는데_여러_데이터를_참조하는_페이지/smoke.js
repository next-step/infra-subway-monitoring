import http from 'k6/http';
import {check, sleep} from 'k6';
import {Counter} from "k6/metrics";

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

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
