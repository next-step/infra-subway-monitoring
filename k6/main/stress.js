import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import {BASE_URL} from '../testInfo.js';

export let options = {
    stages: [
        {duration: '5s', target: 300},
        {duration: '5s', target: 300},
        {duration: '5s', target: 600},
        {duration: '5s', target: 600},
        {duration: '5s', target: 900},
        {duration: '5s', target: 900},
        {duration: '10s', target: 0}
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

export default function ()  {
    let mainRes = http.get(BASE_URL);

    check(mainRes, {
        'main Page Http Response Code 200': (response) => response.status === 200
    })
};
