import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 50},
        {duration: '10s', target: 100},
        {duration: '20s', target: 150},
        {duration: '10s', target: 100},
        {duration: '10s', target: 50}
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 1500'],
    },
};

const BASE_URL = 'https://moonjuhyeon-utc.n-e.kr/';

export function pathPage(){
    return http.get(`${BASE_URL}/path`);
}

export function getPath() {
    return http.get(`${BASE_URL}/paths?source=4&target=5`);
}



export default function () {
    check(pathPage(), {'pathPage success' : (response) => response.status === 200});
    sleep(1);
    check(getPath(), {'getPath success' : (response) => response.status === 200});
    sleep(1);
};
