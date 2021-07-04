import http from "k6/http";
import {check, group, sleep, fail} from "k6";

export let options = {
    stages: [
        {duration: "30s", target: 100},
        {duration: "1m", target: 100},
        {duration: "15s", target: 0},
        {duration: "30s", target: 500},
        {duration: "1m", target: 500},
        {duration: "15s", target: 0},
        {duration: "30", target: 100},
        {duration: "1m", target: 100},
        {duration: "15s", target: 0},
    ],
    thresholds: {
        http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
    },
};
const BASE_URL = 'https://applemango2021.kro.kr';

export default function () {
    let myObjects = http.get(`${BASE_URL}`);
    check(myObjects, {'메인화면 로드함': (res) => res.status === 200});
    sleep(1);
}