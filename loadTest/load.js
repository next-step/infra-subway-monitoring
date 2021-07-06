import {testBody} from './common-body.js';
export {testBody}

export default function() {
    testBody.run();
}

export let options = {
    /* 300 Users during 30 seconds */
    vus: 250,
    duration: '30s',
    thresholds: {
        checks: ['rate > 0.95'], // 95% of requests must complete below 1.5s
        http_req_duration: ['p(95)<1500'], // 95% of requests must complete below 1.5s
    },
};
const BASE_URL = 'https://jordy-torvalds.o-r.kr';
const USERNAME = 'jordy-torvalds@jordy.com';
const PASSWORD = 'jordy';