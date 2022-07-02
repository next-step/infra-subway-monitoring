import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
  stages: [
    {duration: '1m', target: 60},
    {duration: '1m', target: 120},
    {duration: '2m', target: 180},
    {duration: '2m', target: 360},
    {duration: '1m', target: 60},
    {duration: '0m', target: 6},
  ],
  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

const BASE_URL = 'https://aws.coffee-con.xyz';
const USERNAME = 'k.connor614@gmail.com';
const PASSWORD = '1234';

export default function() {
  mainPage();

  let accessToken = login(USERNAME, PASSWORD);

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();

  check(myObjects, {'retrieved member': (obj) => obj.id != 0});

  // 경로 검색 페이지
  pathPage();

  // 경로 조회 시작
  pathsSearchPage();

  sleep(1);
};

function mainPage() {
  let response = http.get(`${BASE_URL}`);

  check(response, {
    'main page successfully': (response) => response.status === 200,
  });
}

function login(username, password) {
  let payload = JSON.stringify({
    email: username,
    password: password,
  });

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

  return loginRes.json('accessToken');
}

function pathPage() {
  let response = http.get(`${BASE_URL}/path`);

  check(response, {
    'path page successfully': (response) => response.status === 200,
  });
}

function pathsSearchPage() {
  let response = http.get(`${BASE_URL}/paths/?source=7&target=112`);

  check(response, {
    'path search page successfully': (response) => response.status === 200,
  });
}
