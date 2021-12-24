import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 1500'],
    },
};

const BASE_URL = 'https://moonjuhyeon-utc.n-e.kr/';
const USERNAME = 'test@test';
const PASSWORD = '1234';

export function login() {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return http.post(`${BASE_URL}/login/token`, payload, params);
}

export default function ()  {
    check(login(), { 'login success': (response) => response.json('accessToken') !== '' });
    sleep(1);
};
