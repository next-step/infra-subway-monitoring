import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
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