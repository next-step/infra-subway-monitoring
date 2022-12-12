import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 20 }, // ramping up
    { duration: '1m', target: 20 },
    { duration: '10s', target: 40 }, // ramping up
    { duration: '2m', target: 40 },
    { duration: '10s', target: 80 }, // ramping up
    { duration: '5m', target: 80 },
    { duration: '10s', target: 160 }, // ramping up
    { duration: '5m', target: 160 },
    { duration: '10s', target: 80 }, // ramping down
    { duration: '5m', target: 80 },
    { duration: '10s', target: 40 }, // ramping down
    { duration: '2m', target: 40 },
    { duration: '10s', target: 20 }, // ramping down
    { duration: '1m', target: 20 },
    { duration: '10s', target: 0 }, // ramping down
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
