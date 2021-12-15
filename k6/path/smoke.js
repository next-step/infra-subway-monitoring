import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://host.docker.internal:8080';

export default function () {
    const getStationsRes = http.get(`${BASE_URL}/stations`);
    check(getStationsRes, {
        'got stations': (r) => r.status === 200,
        'stations are not empty': (r) => JSON.parse(r.body).map(s => s.id).length > 0
    });

    const findPathRes = http.get(`${BASE_URL}/paths?source=${3}&target=${7}`);
    check(findPathRes, {'found path': (r) => r.status === 200});

    sleep(1);
};
