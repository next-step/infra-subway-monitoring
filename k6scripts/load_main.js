import http from 'k6/http';
import {check} from 'k6';

export let options = {
    threshold: {
        http_req_duration: ['p(99)<1000'],
    },
    stages: [
        {duration: '10s', target: 23},
        {duration: '300s', target: 64},
        {duration: '10s', target: 0},
    ],
};

const BASE_URL = 'https://yomni-subway.kro.kr/';

export default function () {

    const mainRes = http.get(`${BASE_URL}`);

    check(mainRes, {
        'is success': (r) => r.status === 200,
    });
}