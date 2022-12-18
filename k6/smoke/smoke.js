import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 1},
        { duration: '1m', target: 2},
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://subwayrun.kro.kr';
const params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function ()  {
    let main = http.get(`${BASE_URL}`);
    check(main, {'200 : main page': (res) => res.status === 200});

    let stations = http.get(`${BASE_URL}/stations`);
    check(stations, {'200 : stations': (res) => res.status === 200});

    let lines = http.get(`${BASE_URL}/lines`);
    check(lines, {'200 : lines': (res) => res.status === 200});

    let path = http.get(`${BASE_URL}/path`);
    check(path, {'200 : path': (res) => res.status === 200});
};