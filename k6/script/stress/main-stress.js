import http from 'k6/http';
import {check, sleep} from 'k6';
import {BASE_URL} from '../service-info.js';

// Throughput (1일 평균 rps ~ 1일 최대 rps): 4 ~ 9
export const options = {
    stages: [
        {duration: '5s', target: 20},
        {duration: '5s', target: 40},
        {duration: '10s', target: 80},
        {duration: '10s', target: 100},
        {duration: '10s', target: 150},
        {duration: '10s', target: 100},
        {duration: '5s', target: 50},
        {duration: '5s', target: 0}

    ],
    thresholds: {
        http_req_duration: ['p(99)<1000']
    }
};

export default function ()  {
    let res = http.get(BASE_URL);
    check(res, {
        'main page status code is 200': (r) => r.status === 200
    });
};