import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10m',
    thresholds: {
        http_req_duration: ['p(99)<200'],
    },
};

const BASE_URL = 'https://mirrors89.p-e.kr/';

export default function () {
    let mainUrl = http.get(`${BASE_URL}/path`);
    check(mainUrl, { 'is main status 200': (r) => r.status === 200});

    let stations = http.get(`${BASE_URL}/stations`);
    check(stations, { 'is stations status 200': (r) => r.status === 200});

    let myObjects = http.get(`${BASE_URL}/paths/?source=4&target=6`).json();
    check(myObjects, { 'is line path API success': (obj) => obj.distance === 3 });
    sleep(1);
};