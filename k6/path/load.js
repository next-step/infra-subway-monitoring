import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 30 }, // target: vus 수
        { duration: '10s', target: 100 },
        { duration: '20s', target: 100 },
        { duration: '5s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 요청의 99%가 1.5초 미만으로 완료되어야 함
    },
};

const BASE_URL = 'http://don-key-alb-1030470679.ap-northeast-2.elb.amazonaws.com';

export default function () {
    const response = http.get(`${BASE_URL}/path?source=5&target=11`);
    check(response, {
        'path-page': response => response.status === 200
    });
}
