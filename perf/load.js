import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '15m', target: 5 },
        { duration: '10s', target: 12 },
        { duration: '15m', target: 12 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99) < 300']
    }
};

const BASE_URL = 'https://subway.ifjso.o-r.kr';
const API_PATH = "paths"
const STATION_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 23, 24, 29, 48];
const RANDOM_NUMBER = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function () {
    const url = new URL(`${BASE_URL}/${API_PATH}`);
    const source = STATION_IDS[RANDOM_NUMBER(0, 19)];
    const target = STATION_IDS[RANDOM_NUMBER(0, 19)];

    url.searchParams.append('source', source);
    url.searchParams.append('target', target);

    const response = http.get(url.toString());

    check(response, { 'search successful': (resp) => resp.status === 200 });
};
