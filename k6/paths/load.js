import http from 'k6/http';
import {check} from 'k6';

export let options = {
    stages: [
        {duration: '5s', target: 7},
        {duration: '10s', target: 35},
        {duration: '10s', target: 35},
        {duration: '5s', target: 0},
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://anydomainpro.kro.kr/';

export default function () {
    const response = http.get(`${BASE_URL}/paths?source=1&target=10`);
    check(response, {
        'found paths': response => response.status === 200
    });
}
