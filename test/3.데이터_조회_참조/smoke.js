import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1.0s
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