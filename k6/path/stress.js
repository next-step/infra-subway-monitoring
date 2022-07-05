import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080';

export const options = {
    stages: [
        { duration: '2m', target: 100 },
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '2m', target: 300 },
        { duration: '5m', target: 300 },
        { duration: '2m', target: 400 },
        { duration: '5m', target: 400 },
        { duration: '10m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000']
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
