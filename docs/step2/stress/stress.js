import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 30 },
    { duration: '1m', target: 90 },
    { duration: '1m', target: 150 },
    { duration: '2m', target: 210 },
    { duration: '5m', target: 300 },
    { duration: '2m', target: 150 },
    { duration: '1m', target: 60 },
    { duration: '1m', target: 30 },
    { duration: '1m', target: 15 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<1000'],
  },
};

const BASE_URL = 'https://haservi.r-e.kr/';
const USERNAME = 'test@email.com';
const PASSWORD = '1111';

export default function () {
  main();

  let token = login();
  me(token);
  pathFinderPage();
  pathFind();

  sleep(1);
}

function main() {
  let response = http.get(`${BASE_URL}`);

  if (
    !check(response, {
      '메인 페이지 접근': (resp) => resp.status === 200,
    })
  ) {
    fail('메인 페이지 접근 *not* 200');
  }
}

function login() {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let loginRes = http.post(
    `${BASE_URL}/login/token`,
    payload,
    params
  );

  if (
    !check(loginRes, {
      '로그인 성공': (resp) => resp.json('accessToken') !== '',
    })
  ) {
    fail('로그인 실패 *not* 200');
  }

  return loginRes.json('accessToken');
}

function me(token) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let myInfo = http.get(`${BASE_URL}/members/me`, authHeaders).json();

  if (
    !check(myInfo, {
      '나의 정보 조회': (obj) => obj.id !== 0,
    })
  ) {
    fail('나의 정보 조회 실패 *not* 200');
  }
}

function pathFinderPage() {
  let path = http.get(BASE_URL + '/path');

  if (
    !check(path, {
      '경로 조회 검색 페이지 접근': (resp) => resp.status === 200,
    })
  ) {
    fail('경로 조회 검색 페이지 실패 *not* 200');
  }
}

function pathFind() {
  let pathFind = http.get(BASE_URL + '/path?source=2&target=6');

  if (
    !check(pathFind, {
      '경로 조회 검색 성공': (resp) => resp.status === 200,
    })
  ) {
    fail('경로 조회 검색 실패 *not* 200');
  }
}
