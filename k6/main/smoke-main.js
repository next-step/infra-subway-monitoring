import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
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