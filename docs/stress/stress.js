
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 61 },
    { duration: '1m', target: 122 },
    { duration: '1m', target: 183 },
    { duration: '1m', target: 244 },
    { duration: '2m', target: 305 },
    { duration: '1m', target:  0 }
  ],
  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://woo.subway-limwoobin.p-e.kr';
const USERNAME = 'limwoobin@naver.com';
const PASSWORD = '1234';

export default function ()  {
  // mainPage 접근
  accessMainPage();

  // login
  let accessToken = login(USERNAME, PASSWORD);


  let authHeaders = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };


  // 경로 조회 페이지 접근
  accessFindPathPage();

  // 경로 검색
  searchPath();

  sleep(1);
};

function accessMainPage() {
  let mainResponse = http.get(`${BASE_URL}`);
  check(mainResponse, {
    'main page success': (response) => response.status == 200
  });
}

function login(username, password) {
  let loginUri = `${BASE_URL}/login/token`;
  let loginPayload = JSON.stringify({
    email: username,
    password: password,
  });

  let loginParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let loginResponse = http.post(loginUri, loginPayload, loginParams);

  check(loginResponse, {
    'logged in successfully': (response) => response.json('accessToken') !== '',
  });

  return loginResponse.json('accessToken');
}

function accessFindPathPage() {
  let findPathResponse = http.get(`${BASE_URL}/path`);

  check(findPathResponse, {
    'find path page success': (response) => response.status = 200
  });
}

function searchPath() {
  let searchPathResponse = http.get(`${BASE_URL}/paths?source=10&target=20`);

  check(searchPathResponse, {
    'search path success': (response) => response.status = 200
  });
}
