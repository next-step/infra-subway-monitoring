import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080';

export const options = {
    vus: 154,
    stages: [
        { duration: '2m', target: 30 },
        { duration: '2m', target: 30 },
        { duration: '2m', target: 60 },
        { duration: '2m', target: 60 },
        { duration: '2m', target: 90 },
        { duration: '2m', target: 90 },
        { duration: '2m', target: 120 },
        { duration: '2m', target: 120 },
        { duration: '2m', target: 154 },
        { duration: '2m', target: 154 },
        { duration: '2m', target: 110 },
        { duration: '2m', target: 70 },
        { duration: '2m', target: 40 },
        { duration: '2m', target: 0 },
        { duration: '2m', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<500']
    }
};

export default function ()  {
    mainPage();
}

function mainPage() {
    const mainPageResponse = http.get(`${BASE_URL}`);
    check(mainPageResponse, {'moved to main page successfully': (resp) => resp.status === 200});
    sleep(1);
}
