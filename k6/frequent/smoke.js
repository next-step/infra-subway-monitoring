import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://jsyang-dev.kro.kr/';

export default function ()  {
    let mainResponse = http.get(`${BASE_URL}`);
    check(mainResponse, {
        'load main page': response => response.status === 200
    });

    sleep(1);
};
