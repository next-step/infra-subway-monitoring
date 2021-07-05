import http from "k6/http";
import {check, group, sleep, fail} from "k6";

export let options = {
    stages: [
        {duration: "30s", target: 30},
        {duration: "1m", target: 30},
        {duration: "15s", target: 40},
        {duration: "30s", target: 40},
        {duration: "1m", target: 50},
        {duration: "15s", target: 50},
        {duration: "30", target: 60},
        {duration: "1m", target: 60},
        {duration: "15s", target: 0},
    ],
    thresholds: {
        http_req_duration: ["p(95)<100"], // 95% of requests must complete below 0.1s
    },
};

const BASE_URL = 'https://applemango2021.kro.kr';

export default function () {
    let myObjects = http.get(`${BASE_URL}/paths?source=1&target=2`).json();
    check(myObjects, {'경로 조회 완료함': (obj) => obj.distance === 23});
    sleep(1);
};