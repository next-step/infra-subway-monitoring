import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5m', target: 2 },
        { duration: '5m', target: 5 },
        { duration: '5m', target: 7 },
        { duration: '5m', target: 10 },
        { duration: '5m', target: 12 },
        { duration: '5m', target: 16 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'],
    },
};

const BASE_URL = 'https://yohan-subway.kro.kr/';

export default function ()  {
    mainPage();
    pathPage();
    findPath();

    sleep(1);
}


function mainPage() {
    const response = http.get(BASE_URL);

    check(response, {
        'success mainPage': (res) => res.status === 200
    });
}

function pathPage() {
    const response = http.get(`${BASE_URL}/path`);

    check(response, {
        'success goPathPage': (res) => res.status === 200
    });
}

function findPath() {
    const response = http.get(`${BASE_URL}/path?source=1&target=3`);

    check(response, {
        'success findPath': (res) => res.status === 200
    });
}
