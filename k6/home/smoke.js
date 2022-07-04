import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:8080';

export const options = {
    vus: 1,
    duration: '10s',
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

