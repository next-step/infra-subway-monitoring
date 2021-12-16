import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        {duration: '5s', target: 50},
        {duration: '5s', target: 100},
        {duration: '10s', target: 100},
        {duration: '5s', target: 150},
        {duration: '5s', target: 150},
        {duration: '10s', target: 200},
        {duration: '5s', target: 200},
        {duration: '5s', target: 100},
        {duration: '10s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'],
    },
};
const BASE_URL = 'http://junhong-kim-alb-1211287518.ap-northeast-2.elb.amazonaws.com';

export default function () {
    let mainResponse = http.get(`${BASE_URL}/paths/?source=3&target=4`);
    check(mainResponse, {
        'main': response => response.status === 200
    });

    sleep(1);
};
