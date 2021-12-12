import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<1000'],
    },
};

const BASE_URL = 'http://15.164.96.247/';

export default function () {
    let response = http.get(`${BASE_URL}/paths/?source=4&target=3`);
    check(response, {
        'path page': response => response.status === 200
    });

    sleep(1);
}
