import http from 'k6/http';
import {check} from 'k6';

export let options = {
    threshold: {
        http_req_duration: ['p(99)<100'],
    },
    stages: [
        {duration: '10s', target: 23},
        {duration: '3600s', target: 64},
        {duration: '10s', target: 0},
    ],
};

const BASE_URL = 'https://yomni-subway.kro.kr/';
const SOURCE_STATION_ID = 1;
const TARGET_STATION_ID = 6;

export default function () {

    // 메인 페이지
    const mainRes = http.get(`${BASE_URL}`);

    check(mainRes, {
        'is success': (r) => r.status === 200,
    });

    // 노선조회 페이지 접근
    const pathRes = http.get(`${BASE_URL}/path`)

    check(pathRes, {
        'is success': (r) => r.status === 200,
    });

    // 노선조회 기능 실행
    const pathsRes = http.get(
        `${BASE_URL}/paths?source=${SOURCE_STATION_ID}&target=${TARGET_STATION_ID}`);

    check(pathsRes, {
        'is success': (r) => r.status === 200,
    });
}
