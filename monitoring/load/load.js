import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  // 평균 VUser : 26
  // 최대 VUser : 48
  stages: [
    { duration: '10s', target: 20 }, // ramping up
    { duration: '3m', target: 20 }, // 05 ~ 06시
    { duration: '10s', target: 30 }, // ramping up
    { duration: '3m', target: 30 }, // 06 ~ 07시
    { duration: '10s', target: 48 }, // ramping up
    { duration: '10m', target: 48 }, // 07 ~ 08시 (피크)
    { duration: '10s', target: 30 }, // ramping down
    { duration: '2m', target: 30 }, // 10 ~ 11시
    { duration: '10s', target: 20 }, // ramping down
    { duration: '2m', target: 20 }, // 11 ~ 12시
    { duration: '10s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(99)<500'], // 99% of requests must complete below 0.5s
  },
};

const BASE_URL = 'https://shshon-infra.o-r.kr';

export default function ()  {
  // 메인 페이지 -> 경로 탐색 페이지 -> 경로 탐색 요청
  loadMainPage();
  loadPathPage();
  findPath();
  sleep(1);
};

function loadMainPage() {
  const response = http.get(BASE_URL);
  check(response, {
    'loaded main page in successfully': (res) => res.status === 200,
  });
}

function loadPathPage() {
  const response = http.get(`${BASE_URL}/path`);
  check(response, {
    'loaded path page in successfully': (res) => res.status === 200,
  });
}

function findPath() {
  let source = Math.floor(Math.random() * 10 + 1);
  let target = Math.floor(Math.random() * 10 + 1);
  const response = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);
  check(response, {
    'get path info in successfully': (res) => res.status === 200,
  });
}
