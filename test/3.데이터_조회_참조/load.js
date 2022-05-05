import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '1m', target: 28},  // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        {duration: '2m', target: 280}, // stay at 100 users for 10 minutes
        {duration: '10s', target: 0},  // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'],
    },
};

const BASE_URL = 'https://saerang.r-e.kr/';

export default function ()  {

    let path = http.get(`${BASE_URL}/path`);
    check(path, { 'retrieved path': (obj) => obj.status == 200 });

    let paths = http.get(`${BASE_URL}/paths?source=3&target=7`);
    check(paths, { 'path res': (obj) => obj.status == 200 });
    sleep(1);
};