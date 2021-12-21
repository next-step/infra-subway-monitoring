import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 200},
        {duration: '10s', target: 400},
        {duration: '10s', target: 600},
        {duration: '10s', target: 800},
        {duration: '10s', target: 1000},
        {duration: '10s', target: 1200},
        {duration: '10s', target: 1400},
        {duration: '10s', target: 1600},
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://all-forone.p-e.kr/';

export default function ()  {
    let pageResponse = http.get(BASE_URL);
    check(pageResponse, { 'page loading complete': (response) => response.status === 200 });
    sleep(1);
};