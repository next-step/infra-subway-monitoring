import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '20s', target: 100},
        {duration: '20s', target: 200},
        {duration: '20s', target: 300},
        {duration: '20s', target: 400},
        {duration: '20s', target: 500},
        {duration: '20s', target: 600},
        {duration: '10s', target: 0}
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