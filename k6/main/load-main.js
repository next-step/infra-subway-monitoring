import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 400 },
        { duration: '20s', target: 400 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'],
    },
};

const BASE_URL = 'http://keepbang-alb-975163363.ap-northeast-2.elb.amazonaws.com';

export default function ()  {
    let mainResponse = http.get(`${BASE_URL}`);

    check(mainResponse, {
        'main page': response => response.status === 200
    });

    sleep(1);
};