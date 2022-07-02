import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '3m', target: 200 },
        { duration: '1m', target: 300 },
        { duration: '5m', target: 300 },
        { duration: '5m', target: 400 },
        { duration: '1m', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'] // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://www.sangik-kim.kro.kr';

export default function ()  {
    landingPage();
    findPathPage();
    findPathApi();
    sleep(1);
};

function landingPage() {
    const landingPageRes = http.get(`${BASE_URL}`);
    check(landingPageRes, { 'Successfully landed': (resp) => resp.status == 200 });
}

function findPathPage() {
    const findPathPageRes = http.get(`${BASE_URL}/path`);
    check(findPathPageRes, { 'Successfully loaded the finding path page': (resp) => resp.status == 200 });
}

function findPathApi() {
    const findPathApiRes = http.get(`${BASE_URL}/paths/?source=3&target=6`);
    check(findPathApiRes, { 'Successfully found the shortest path': (resp) => resp.status == 200 });
}
