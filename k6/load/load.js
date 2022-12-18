import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '1m', target: 5 },
        { duration: '10s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '10s', target: 5 },
        { duration: '1m', target: 5 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.0s
    }
};

const BASE_URL = 'https://subwayrun.kro.kr';

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