import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5m', target: 125 },
        { duration: '20m', target: 125 },
        { duration: '5m', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://infra-subway-deploy.n-e.kr';

export default function ()  {

    let stationRes = http.get(`${BASE_URL}/stations`);
    check(stationRes, {
        'got station list successfully': (resp) => resp.json().length > 0,
    });

    let pathRes = http.get(`${BASE_URL}/paths/?source=4&target=360`);
    check(pathRes, {
        'path searched successfully': (resp) => resp.json('stations').length > 0
    });
    sleep(5);
};