import http from 'k6/http';
import {check} from 'k6';

export let options = {
    stages: [
        {duration: '5s', target: 35},
        {duration: '10s', target: 70},
        {duration: '10s', target: 140},
        {duration: '10s', target: 280},
        {duration: '10s', target: 350},
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://anydomainpro.kro.kr/';

export default function () {
    const response = http.get(`${BASE_URL}`);
    check(response, {
        'loaded main page': response => response.status === 200
    });
}
