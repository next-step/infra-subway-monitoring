import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 11,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://infra-subway.p-e.kr/paths/?source=1&target=2';

export default function () {
    const before = new Date().getTime();
    const T = 2.4;

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    http.get(`${BASE_URL}`, params);

    const after = new Date().getTime();
    const diff = (after - before) / 1000;
    const remainder = T - diff;
    check(remainder, { 'reached request rate': remainder > 0 });
    if (remainder > 0) {
        sleep(remainder);
    } else {
        console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
    }
}