import http from 'k6/http';
import { check, sleep } from 'k6';

// 부하테스트 (load) 평균/최대 VUs : 38.5/385
export const options = {

    stages: [
        { duration: '2m', target: 39 }, // below normal load
        { duration: '1m', target: 39 },
        { duration: '2m', target: 120 }, // normal load
        { duration: '1m', target: 120 },
        { duration: '2m', target: 385 }, // overload
        { duration: '1m', target: 385 },
        { duration: '2m', target: 0 }, // scale down. Recovery stage.
    ],

    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 0.2s
    },
};

export default () => {
    const BASE_URL = 'https://mand2-infra-subway.kro.kr';

    // login X + batch, batch 는 순서상관 없이 세팅된 값 실행.
    const requests = {
        'front page': BASE_URL,
        'search path page': {
            method: 'GET',
            url: `${BASE_URL}/paths/?source=${240}&target=${250}`,
        },
    };
    const responses = http.batch(requests);

    // when accessing results, we use the name of the request as index
    // in order to find the corresponding Response object
    check(responses['front page'], {
        'front page status was 200': (res) => res.status === 200,
    });
    check(responses['search path page'], {
        'search path page status was 200': (res) => res.status === 200,
    });

    sleep(1);
};
