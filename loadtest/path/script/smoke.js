import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://applemango2021.kro.kr';

export default function () {
    let myObjects = http.get(`${BASE_URL}/paths?source=1&target=2`).json();
    check(myObjects, {'경로 조회 완료함': (obj) => obj.distance === 23});
    sleep(1);
};
