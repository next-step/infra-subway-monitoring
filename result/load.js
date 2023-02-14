import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5m', target: 230 },
        { duration: '10', target: 230 },
        { duration: '5m', target: 0 },
    ],
    thresholds: {
        'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://192.168.2.49:8080';

export default function() {

    const source = Math.random() * 7 + 1;
    const target = Math.random() * 7 + 1;

    const stations = http.get(`${BASE_URL}/stations`);
    check(stations, { 'get stations': (res) => res.status === 200 });

    const path = http.get(`${BASE_URL}/paths/?source=3&target=6`);
    check(path, { 'get path': (res) => res.status === 200 });
    sleep(1);
};