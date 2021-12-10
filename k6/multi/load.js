import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        {duration: '5s', target: 50},
        {duration: '20s', target: 200},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://jsyang-dev.kro.kr/';

export default function () {
    let pathResponse = http.get(`${BASE_URL}/paths/?source=29&target=112`);
    check(pathResponse, {
        'found path': response => response.status === 200
    });

    sleep(1);
};
