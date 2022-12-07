import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '60s', target: 20 },
    { duration: '60s', target: 40 },
    { duration: '60s', target: 80 },
    { duration: '60s', target: 160 },
    { duration: '60s', target: 320 },
    { duration: '60s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://anwjrrp33-webservice.kro.kr/';
const USERNAME = 'email@email.com';
const PASSWORD = 'password';

function mainPage() {
  let mainPageResponse = http.get(`${BASE_URL}`);

  check(mainPageResponse, {
    '메인 페이지 응답 성공': (response) => response.status === 200,
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
  let loginResponse = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginResponse, {
    '로그인 성공': (resp) => resp.json('accessToken') !== '',
  });

  return loginResponse.json('accessToken');
}

function pathPage() {
  let pathPageResponse = http.get(`${BASE_URL}/path`);

  check(pathPageResponse, {
    '경로 검색 페이지 응답 성공': (response) => response.status === 200,
  });
}

function pathSearch() {
  let pathSearchResponse = http.get(`${BASE_URL}/path?source=13&target=68`);
  check(pathSearchResponse, {
    '최단 경로 검색 응답 성공': (response) => response.status === 200,
  });
}

function pathSearch(accessToken) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let pathSearchResponse = http.get(`${BASE_URL}/path?source=13&target=68`, authHeaders);

  check(pathSearchResponse, {
    '최단 경로 검색 응답 성공': (response) => response.status === 200,
  });
}

export default function ()  {
  mainPage();
  pathPage();
  pathSearch();
  pathSearch(login());

  sleep(1);
}