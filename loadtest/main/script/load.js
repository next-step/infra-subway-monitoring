import http from "k6/http";
import {check, group, sleep, fail} from "k6";

export let options = {
    stages: [
        {duration: "30s", target: 50}, // simulate ramp-up of traffic from 1 to 50 users over 30 seconds.
        {duration: "1m", target: 100}, // stay at 100 users for 1 minutes
        {duration: "10s", target: 0}, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ["p(99)<100"], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'https://applemango2021.kro.kr';

export default function () {
    let myObjects = http.get(`${BASE_URL}`);
    check(myObjects, {'메인화면 로드함': (res) => res.status === 200});
    sleep(1);
};
