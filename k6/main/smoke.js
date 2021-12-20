import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 요청의 99%가 1.5초 미만으로 완료되어야 함
    },
};

const BASE_URL = 'http://don-key-alb-1030470679.ap-northeast-2.elb.amazonaws.com';

export default function () {
    const response = http.get(`${BASE_URL}`);
    check(response, {
        'main-page': response => response.status === 200
    });
}
