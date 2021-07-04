import http from "k6/http";
import {check, group, sleep, fail} from "k6";

export let options = {
    stages: [
        {duration: "30s", target: 100},
        {duration: "1m", target: 100},
        {duration: "15s", target: 0},
        {duration: "30s", target: 200},
        {duration: "1m", target: 200},
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
const USERNAME = 'TEST@gmail.com';
const PASSWORD = 'password';

export default function () {

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD
    });

    var params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });
};