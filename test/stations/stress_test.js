import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '3s', target: 10 },
        { duration: '3s', target: 50 },
        { duration: '6s', target: 100 },
        { duration: '9s', target: 300 },
        { duration: '10s', target: 500 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://localhost:8080';

export default function ()  {

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let response = http.get(`${BASE_URL}/stations`, params).json;

    check(response, { 'retrieved member': (obj) => obj.length !== 0 });
    sleep(1);
}