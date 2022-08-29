import { loginPathSearch } from '../common/loginPathSearch.js'

export const options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.2s
    },
};

export default () => {
    // login + path 찾는 기능을 모듈 하나로. load에도 쓰임.
    loginPathSearch();
};
