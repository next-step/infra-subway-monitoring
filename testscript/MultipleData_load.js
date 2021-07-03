import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '1m', target: 175},
        {duration: '2m', target: 175},
        {duration: '10s', target: 0}
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://dacapolife87-test.n-e.kr/';


export default function ()  {

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let pathRes = http.get(`${BASE_URL}/paths?source=227&target=56`, params);

    check(pathRes, {
        'find path in successfully': (resp) => resp.status == 200,
        'distance': (resp) => resp.json('distance') == 30,
    });

    sleep(1);
};
