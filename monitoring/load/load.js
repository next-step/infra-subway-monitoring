import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 6 },
    { duration: '5m', target: 7 },
    { duration: '4m', target: 8 },
    { duration: '3m', target: 11 },
    { duration: '5m', target: 12 },
    { duration: '2m', target: 11 },
    { duration: '5m', target: 7 },
    { duration: '4m', target: 3 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<500'], // 99% of requests must complete below 0.5s
  },
};

const BASE_URL = 'https://shshon-infra.o-r.kr/';
const USERNAME = 'test@tesh.com';
const PASSWORD = 'test';

export default function ()  {
  // 메인 페이지 -> 로그인 -> 경로 탐색
  loadMainPage();
  const authHeaders = login();
  retrieveMember(authHeaders);
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

function login() {
  const payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

  return {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
}

function retrieveMember(authHeaders) {
  const myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
}

function loadPathPage() {
  const response = http.get(`${BASE_URL}/path`);
  check(response, {
    'loaded path page in successfully': (res) => res.status === 200,
  });
}

function findPath(authHeaders) {
  const response = http.get(`${BASE_URL}/paths?source=3&target=4`, authHeaders);
  check(response, {
    'get path info in successfully': (res) => res.status === 200,
  });
}
