import http from "k6/http";
import {check, group, sleep, fail} from "k6";

export let options = {
    stages: [
        {duration: "30s", target: 50}, // simulate ramp-up of traffic from 1 to 50 users over 30 seconds.
        {duration: "1m", target: 50}, // stay at 50 users for 1 minutes
        {duration: "10s", target: 0}, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ["p(99)<2300"], // 99% of requests must complete below 2.3s
    },
};

const BASE_URL = 'https://applemango2021.kro.kr';

export default function () {
    let myObjects = http.get(`${BASE_URL}/paths?source=1&target=2`).json();
    check(myObjects, {'경로 조회 완료함': (obj) => obj.distance === 23});
    sleep(1);
};
