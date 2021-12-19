import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '20s', target: 100 },
        { duration: '5s', target: 0 },
    ],

    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://smpark1020.o-r.kr/';

export default function () {

    let pathObject = http.get(`${BASE_URL}/paths?source=89&target=276`).json();
    check(pathObject, {'retrieved path': (obj) => obj.id != 0});
    sleep(1);
};
