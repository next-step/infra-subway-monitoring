import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import { run } from './task.js'

export const options = {
    stages: [
        { duration: '1s', target: 48 },
        { duration: '1m', target: 48 },
        { duration: '1m', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<500'], // 99% of requests must complete below 0.5s
    },
};

export default function ()  {
    run();
};