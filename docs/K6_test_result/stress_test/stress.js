import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '20s', target: 50 },
        { duration: '40s', target: 50 },

        { duration: '20s', target: 100 },
        { duration: '40s', target: 100 },

        { duration: '20s', target: 200 },
        { duration: '40s', target: 200 },

        { duration: '20s', target: 300 },
        { duration: '40s', target: 300 },

        { duration: '20s', target: 400 },
        { duration: '40s', target: 400 },

        { duration: '1m30s', target: 0 }, // 6m 30s
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://runningmap.kro.kr';

export default function ()  {

    accessPathFindPage();
    findPath();

    sleep(1);
};

function accessPathFindPage() {
    let requestPathPage = http.get(`${BASE_URL}/path`);
    check(requestPathPage, {
        '[SUCCESS] connect to find path page': (response) => response.status === 200,
    });
}

function findPath() {
    let findPathResponse = http.get(`${BASE_URL}/paths/?source=94&target=246`);
    check(findPathResponse, {
        '[SUCCESS] find shortest path': (response) => response.status === 200,
        '[SUCCESS] find shortest path distance': (response) => response.json().distance > 0,
    })
}