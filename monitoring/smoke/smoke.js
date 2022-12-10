import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1,
    duration: '60s',
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://hahoho87-subway.kro.kr';

function main() {
    let mainPageRes = http.get(`${BASE_URL}/`);
    check(mainPageRes, {
        'Moved to main page': (res) => res.status === 200,
    });
}

function path() {
    let pathPageRes = http.get(`${BASE_URL}/path`);
    check(pathPageRes, {
        'Moved to path page': (res) => res.status === 200,
    });
}

function findPath(authHeaders) {
    let findPathRes = http.get(`${BASE_URL}/paths?source=1&target=50`, authHeaders);
    check(findPathRes, {
        'Found path': (res) => res.status === 200,
    });
}

export default function () {
    main();
    path();
    findPath();

    sleep(1);
};
