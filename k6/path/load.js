import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080';

export const options = {
    vus: 154,
    stages: [
        { duration: '2m', target: 0 },
        { duration: '2m', target: 30 },
        { duration: '2m', target: 60 },
        { duration: '2m', target: 90 },
        { duration: '2m', target: 120 },
        { duration: '2m', target: 154 },
        { duration: '2m', target: 154 },
        { duration: '2m', target: 154 },
        { duration: '2m', target: 154 },
        { duration: '2m', target: 154 },
        { duration: '2m', target: 120 },
        { duration: '2m', target: 90 },
        { duration: '2m', target: 60 },
        { duration: '2m', target: 30 },
        { duration: '2m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<500']
    }
};

export default function ()  {
    pathPage();
    searchPath();
}

function pathPage() {
    const pathPageResponse = http.get(`${BASE_URL}/path`);
    check(pathPageResponse, {'moved to path page successfully': (resp) => resp.status === 200});
    sleep(1);
}

function searchPath() {
    const searchPathResponse = http.get(`${BASE_URL}/paths/?source=1&target=2`);
    check(searchPathResponse, {'searched path successfully': (resp) => resp.status === 200});
    sleep(1);
}