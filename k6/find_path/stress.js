import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        {duration: '5s', target: 10},
        {duration: '5s', target: 30},
        {duration: '5s', target: 50},
        {duration: '5s', target: 70},
        {duration: '5s', target: 100},
        {duration: '5s', target: 70},
        {duration: '5s', target: 50},
        {duration: '5s', target: 30},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'],
    },
};

const BASE_URL = 'http://junhong-kim-alb-1211287518.ap-northeast-2.elb.amazonaws.com';

export default function () {
    let pathResponse = http.get(`${BASE_URL}/paths/?source=3&target=4`);
    check(pathResponse, {
        'find_path': response => response.status === 200
    });

    sleep(1);
};
