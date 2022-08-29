import { loginPathSearch } from '../common/loginPathSearch.js'

// 부하테스트 (load) 평균/최대 VUs : 38.5/385 | 기간 30min~1h
// 최대 VUs : 385 => therefore it's recommended to configure the load test with the high load in mind
export const options = {
    stages: [
        { duration: '10m', target: 385 }, // simulate ramp-up of traffic from 1 to 385 users over 5 minutes.
        { duration: '15m', target: 385 }, // stay at 385 users for 10 minutes
        { duration: '10m', target: 0 }, // ramp-down to 0 users
    ],

    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.2s
    },
};

export default () => {
    // login 모듈을 공통으로 빼서 import.
    loginPathSearch();
};
