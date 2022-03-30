import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://infra-subway.p-e.kr';

export default function () {

    const url = new URL(`${BASE_URL}/paths`);
    url.searchParams.append('source', '2')
    url.searchParams.append('target', '3')

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let pathResponse = http.get(url.toString(), params);

    check(pathResponse, {
        'find path in successfully': (response) => response.status == 200,
    });

    sleep(1);
}