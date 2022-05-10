import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 200 }, // below normal load
        { duration: '30s', target: 200 },
        { duration: '10s', target: 600 }, // normal load
        { duration: '30s', target: 600 },
        { duration: '10s', target: 800 }, // around the breaking point
        { duration: '30s', target: 800 },
        { duration: '10s', target: 1400 }, // beyond the breaking point
        { duration: '30s', target: 1400 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'] // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://jiwonkwon-infra.p-e.kr/';

export default function ()  {

    http.get(`${BASE_URL}`);

    sleep(1);
};