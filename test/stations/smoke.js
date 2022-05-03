import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
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