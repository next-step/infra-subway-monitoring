import {testBody} from './common-body.js';
export {testBody}

export default function() {
    testBody.run();
}

export let options = {
    stages: [ /* ex. duration: 10s, target 100 -> 10초간 100명의 가상 사용자가 테스트 진행*/
        { duration: '10s', target: 100 },
        { duration: '10s', target: 200 },
        { duration: '30s', target: 300 },
        { duration: '20s', target: 400 },
        { duration: '10s', target: 300 },
        { duration: '20s', target: 200 },
        { duration: '30s', target: 100 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        checks: ['rate > 0.95'], // 95% of requests must complete below 1.5s
        http_req_duration: ['p(95)<1500'], // 95% of requests must complete below 1.5s
    },
};
const BASE_URL = 'https://jordy-torvalds.o-r.kr';
const USERNAME = 'jordy-torvalds@jordy.com';
const PASSWORD = 'jordy';