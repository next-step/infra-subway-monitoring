import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export {run};

const BASE_URL = 'https://nextstep-aksgudwns.p-e.kr';

function run() {
    loadMainPage();
    loadPathFindPage();
    findPath();
}

function loadMainPage() {
    check(http.get(`${BASE_URL}`), {
        'open main page success': (res) => res.status === 200
    });
}

function loadPathFindPage() {
    check(http.get(`${BASE_URL}/path`), {
        'open find path page success': (res) => res.status === 200
    });
}

function findPath() {
    const headerParams = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    check(http.get(`${BASE_URL}/path?source=1&target=2`, headerParams), {
        'find path successfully': (res) => res.status === 200
    });
}
