import http from 'k6/http';
import {check} from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://anydomainpro.kro.kr/';

export default function () {
    const response = http.get(`${BASE_URL}/paths?source=1&target=10`);
    check(response, {
        'found paths': response => response.status === 200
    });
}
