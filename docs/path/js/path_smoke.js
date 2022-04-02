import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const url = new URL('https://wgs-runningmap.kro.kr/');

export default function ()  {
url.searchParams.append('source', '3');
url.searchParams.append('target', '5');

var params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

let getRes = http.get(url.toString(), params);

check(getRes, {
    'response code was 200': (res) => res.status == 200,
});

sleep(1);
};