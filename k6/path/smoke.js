import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};
const BASE_URL = 'https://coding-knowjam.kro.kr';

export function pathPage(){
    return http.get(`${BASE_URL}/path`);
}

export function getPath() {
    return http.get(`${BASE_URL}/paths?source=1&target=3`);
}

export default function () {
    check(pathPage(), {'pathPage success' : (response) => response.status === 200});
    sleep(1);
    check(getPath(), {'getPath success' : (response) => response.status === 200});
    sleep(1);
};
