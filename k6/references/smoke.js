import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://kelicia91.kro.kr/';

export default function () {
    let pathResponse = http.get(`${BASE_URL}/paths?source=3&target=4`);
    check(pathResponse, {
        'found path': response => response.status === 200
    });

    sleep(1);
};
