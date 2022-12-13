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

const BASE_URL = 'https://yomni-subway.kro.kr';
const SOURCE_STATION_ID = 1;
const TARGET_STATION_ID = 6;
// 27개역 통과 경로 조회

export default function () {

    const pathRes = http.get(
        `${BASE_URL}/paths?source=${SOURCE_STATION_ID}&target=${TARGET_STATION_ID}`);

    check(pathRes, {
        'is success': (r) => r.status === 200,
    });
}
