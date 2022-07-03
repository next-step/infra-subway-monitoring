import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 122 },
        { duration: '2m', target: 122 },
        { duration: '2m', target: 244 },
        { duration: '2m', target: 244 },
        { duration: '2m', target: 366 },
        { duration: '2m', target: 366 },
        { duration: '2m', target: 488 },
        { duration: '2m', target: 488 },
        { duration: '4m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<100']
    },
};

const BASE_URL = 'https://jaesungahn91.kro.kr';

export default function ()  {
    // 경로 검색 조회
    var source = Math.floor((Math.random() * (308)) + 1);
    var target = Math.floor((Math.random() * (616-310)) + 309);
    findPath(source, target);
};

function findPath(source, target) {
    let loginRes = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);

    check(loginRes, {
        'retrieved path': (resp) => resp.status === 200,
    });
}