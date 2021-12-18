import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../service-info.js';

export let options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<1000']
    }
};

export default function () {
    let res = http.get(BASE_URL);
    check(res, {
        'main page status code is 200': (r) => r.status === 200
    });
};
