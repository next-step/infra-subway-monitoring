import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 40 },
        { duration: '4m', target: 40 },
        { duration: '2m', target: 80 },
        { duration: '4m', target: 80 },
        { duration: '2m', target: 160 },
        { duration: '4m', target: 160 },
        { duration: '2m', target: 320 },
        { duration: '4m', target: 320 },
        { duration: '2m', target: 640 },
        { duration: '4m', target: 640 }
    ],

    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'https://infragongbang.kro.kr/';

function main() {
    let response = http.get(`${BASE_URL}`);

    check(response, {"load main page": (resp) => resp.status === 200});
}

function path() {
    let response = http.get(`${BASE_URL}/path`);

    check(response, {"load path page ": (resp) => resp.status === 200});
}

function find(params) {
    let response = http.get(`${BASE_URL}/path?source=1&target=5`, params);

    check(response, {"find path ": (resp) => resp.status === 200});
}

export default function () {

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    main();

    path();

    find(params);

    sleep(1);
};
