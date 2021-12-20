import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 20},
        {duration: '10s', target: 40},
        {duration: '10s', target: 60},
        {duration: '10s', target: 80},
        {duration: '10s', target: 100},
        {duration: '10s', target: 120},
        {duration: '10s', target: 140},
        {duration: '10s', target: 160},
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://all-forone.p-e.kr/stations';

export default function ()  {
    let pageResponse = http.get(BASE_URL);
    check(pageResponse, { 'page loading complete': (response) => response.status === 200 });
    sleep(1);
};