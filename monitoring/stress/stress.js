import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 0 },
    { duration: '2m', target: 5 },
    { duration: '2m', target: 10 },
    { duration: '2m', target: 20 },
    { duration: '2m', target: 40 },
    { duration: '2m', target: 80 },
    { duration: '2m', target: 160 },
    { duration: '2m', target: 320 },
    { duration: '2m', target: 160 },
    { duration: '2m', target: 80 },
    { duration: '2m', target: 40 },
    { duration: '2m', target: 20 },
    { duration: '2m', target: 10 },
    { duration: '2m', target: 5 },
    { duration: '1m', target: 0 }, // ramp-down to 0 users
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
