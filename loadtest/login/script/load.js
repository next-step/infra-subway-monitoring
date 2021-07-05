import http from "k6/http";
import {check, group, sleep, fail} from "k6";

export let options = {
    stages: [
        {duration: "30s", target: 100}, // simulate ramp-up of traffic from 1 to 100 users over 30 seconds.
        {duration: "1m", target: 50}, // stay at 100 users for 1 minutes
        {duration: "10s", target: 0}, // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.0s
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
