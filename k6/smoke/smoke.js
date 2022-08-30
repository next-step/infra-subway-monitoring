import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        http_req_duration: ['p(99)<1000'],
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
