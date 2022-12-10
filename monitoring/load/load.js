import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  // 총 37분
  stages: [
    { duration: '1m', target: 8 }, // 06 ~ 07시
    { duration: '5m', target: 25 }, // 07 ~ 08시 (피크)
    { duration: '5m', target: 50 }, // 08 ~ 09시 (피크)
    { duration: '3m', target: 10 }, // 10 ~ 11시
    { duration: '2m', target: 7 }, // 11 ~ 12시
    { duration: '2m', target: 5 }, // 12 ~ 13시
    { duration: '2m', target: 3 }, // 13 ~ 14시
    { duration: '2m', target: 4 }, // 14 ~ 15시
    { duration: '5m', target: 5 }, // 15 ~ 16시
    { duration: '4m', target: 10 }, // 16 ~ 17시
    { duration: '5m', target: 25 }, // 17 ~ 18시 (피크)
    { duration: '5m', target: 50 }, // 18 ~ 19시 (피크)
    { duration: '1m', target: 7 }, // 19 ~ 20시
  ],
  thresholds: {
    http_req_duration: ['p(99)<500'], // 99% of requests must complete below 0.5s
  },
};

const BASE_URL = 'https://shshon-infra.o-r.kr';
const USERNAME = 'test@test.com';
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
