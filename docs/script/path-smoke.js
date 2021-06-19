import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://public.enemfk777.kro.kr';

export default function ()  {

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let loginRes = http.get(`${BASE_URL}/paths?source=${1}&target=${5}`, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.status === 200,
        'correct distance' : (resp) => resp.json('distance') === 26
    });

    sleep(1);
};
