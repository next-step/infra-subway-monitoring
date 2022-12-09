import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import { run } from './task.js'

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<500'], // 99% of requests must complete below 1.5s
    },
};

export default function ()  {
    run();
};
