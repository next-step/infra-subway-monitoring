import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
    stages: [
        { duration: '5m', target: 100 },
        { duration: '5m', target: 300 },
        { duration: '5m', target: 500 },
        { duration: '10m', target: 700 },
        { duration: '10m', target: 1000 },
        { duration: '10m', target: 2000 },
        { duration: '10m', target: 4000 },
        { duration: '10m', target: 0 }
    ],
};


const BASE_URL = 'https://tuliplee.o-r.kr';
export default () => {
    const res = http.get(`${BASE_URL}/path`);
    check(res, {
        'is status 200': (r) => r.status === 200,
    });

    const object= http.get(`${BASE_URL}/paths/?source=1&target=8`).json();
    check(object, { 'path': (obj) => obj.distance === 15 });

    sleep(1);
};