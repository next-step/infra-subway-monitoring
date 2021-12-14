import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 50 },
        { duration: '20s', target: 200 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'],
    },
};

const BASE_URL = 'http://keepbang-alb-975163363.ap-northeast-2.elb.amazonaws.com/paths/?source=6&target=7';

export default function ()  {
    let mainResponse = http.get(`${BASE_URL}`);

    check(mainResponse, {
        'paths': response => response.status === 200
    });

    sleep(1);
};