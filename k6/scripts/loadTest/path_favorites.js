import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics'
import { login, generateAuthorizationHeaderWith } from '../login.js';
export const CounterErrors = new Counter('Errors');
export let options = {
    stages: [
        {duration: '15m', target: 31},
        {duration: '15m', target: 31},
        {duration: '15m', target: 0},
    ],

    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(99)<800'], // 99% of requests must complete below 0.8s
        'Errors': ['count<100'], // count of errors must be less than 100
    },
};
const BASE_URL = 'https://www.find-subway.p-e.kr';

export default function ()  {
    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const path_url = new URL(`${BASE_URL}/paths`);
    path_url.searchParams.append('source', 6);
    path_url.searchParams.append('target', 54);

    const path_response = http.get(path_url.toString(), params);
    check(path_response, {
        'find the best route in successfully': (resp) => resp.json().distance === 9,
    });
    const auth_header = generateAuthorizationHeaderWith(login());
    var payload = JSON.stringify({
        source: 6,
        target: 54,
    });
    const fav_url = new URL(`${BASE_URL}/favorites`);
    const fav_response = http.post(fav_url.toString(), payload, auth_header);
    check(fav_response, {
        'add To Favorites in successfully': (res) => res.status === 201,
    });
    sleep(1);
};