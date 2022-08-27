import http from 'k6/http';
import { check, sleep } from 'k6';

// 부하테스트 (load) 평균/최대 VUs : 385 per 10 min
export const options = {

    stages: [
        { duration: '2m', target: 39 }, // below normal load
        { duration: '1m', target: 39 },
        { duration: '2m', target: 120 }, // normal load
        { duration: '1m', target: 120 },
        { duration: '2m', target: 200 },
        { duration: '1m', target: 200 },
        { duration: '2m', target: 300 }, // overload
        { duration: '1m', target: 300 },
        { duration: '5m', target: 0 }, // scale down. Recovery stage.
    ],

    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.2s
    },
};

export default () => {
    const BASE_URL = 'https://mand2-infra-subway.kro.kr';

    // login X
    const url = `${BASE_URL}/paths/?source=${240}&target=${250}`;
    const response = http.get(url)
    check(response, {
        'search path in successfully': (response) => response.status === 200
    });

    sleep(1);
};
