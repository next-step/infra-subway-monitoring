import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5m', target: 162 },
        { duration: '10m', target: 162 },
        { duration: '10m', target: 162 },
        { duration: '5m', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 0.1s
        // 내가 보낸 99%가 100ms 안에 들어와야한다 는 임계값 (thresholds)
    },
};

const BASE_URL = 'https://yina-infra.p-e.kr';

export default function () {
    main();
    path();
};

function main() {
    let mainResponse = http.get(`${BASE_URL}`);
    check(mainResponse, {
        'load main page': response => response.status === 200
    });
    sleep(1);
}

function path(){
    let pathResponse = http.get(`${BASE_URL}/paths/?source=7&target=78`);
    check(pathResponse, {
        'find path': response => response.status === 200
    });

    sleep(1);
}