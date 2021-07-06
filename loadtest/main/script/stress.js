import http from "k6/http";
import {check, group, sleep, fail} from "k6";

export let options = {
    stages: [
        {duration: "30s", target: 400},
        {duration: "1m", target: 400},
        {duration: "15s", target: 500},
        {duration: "30s", target: 500},
        {duration: "1m", target: 600},
        {duration: "15s", target: 600},
        {duration: "30", target: 700},
        {duration: "1m", target: 700},
        {duration: "15s", target: 0},
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
}