import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 17 },
        { duration: '10m', target: 17 },
        { duration: '10s', target: 176 },
        { duration: '20m', target: 176 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://www.infra-subway-deploy.kro.kr';

// 역 번호 범위 : 1 ~ 10
function getRandomInt() {
    return Math.floor(Math.random() * 10 + 1);
}

export default function ()  {

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // 홈페이지 접근
    let homepage = http.get(`${BASE_URL}`, params);
    check(homepage, {
        'homepage\'s status 200': (resp) => resp.status === 200,
    });

    // 경로 검색 탭 접근
    let station = http.get(`${BASE_URL}/stations`, params);
    check(station, {
        'station\'s status 200': (resp) => resp.status === 200,
    });

    // 출발역 & 도착역 선택
    let stations = JSON.parse(station.body)
    let source = stations[getRandomInt()].id
    let target = stations[getRandomInt()].id

    // 경로 검색
    let search = http.get(`${BASE_URL}/paths/?source=${source}&target=${target}`, params);
    check(search, {
        'search\'s status 200': (resp) => resp.status === 200,
    });

    sleep(1);
};