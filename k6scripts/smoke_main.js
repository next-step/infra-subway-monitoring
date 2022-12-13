import http from 'k6/http';
import {check} from 'k6';

export let options = {
    threshold: {
        http_req_duration: ['p(99)<1500'],
    },
    stages: [
        {duration: '1s', target: 2},
        {duration: '5s', target: 2},
        {duration: '1s', target: 0},
    ],
};

const BASE_URL = 'https://yomni-subway.kro.kr/';

export default function () {

    const mainRes = http.get(`${BASE_URL}`);

    check(mainRes, {
        'is success': (r) => r.status === 200,
    });
}