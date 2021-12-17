import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 50 },
        { duration: '5s', target: 50 },
        { duration: '20s', target: 300 },
        { duration: '5s', target: 300 },
        { duration: '15s', target: 600 },
        { duration: '5s', target: 600 },
        { duration: '25s', target: 1200 },
        { duration: '10s', target: 1200 },
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