import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
        {duration: "10s", target: 100},
    ],
    thresholds: {
        http_req_duration: ["p(99)<100"], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'https://hk0305.n-e.kr/';

export default function() {
    let stationPageObjects = http.get(`${BASE_URL}/station`);
    check(stationPageObjects, { 'access Station Page': (obj) => obj.id != 0 });
    sleep(1);
}
