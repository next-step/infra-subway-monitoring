import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
      { duration: '5m', target: 230 }, // simulate ramp-up of traffic from 1 to 230 users over 5 minutes
      { duration: '2m', target: 600 }, // ramp-up to 600 users over 2 minutes (peak hour starts)
      { duration: '1m', target: 800 }, // stay at 800 users for 1 minutes
      { duration: '2m', target: 700 }, // ramp-down to 700 users over 2 minutes (peak hour ends)
      { duration: '2m', target: 500 }, // stay at 500 users for  2minutes
      { duration: '1m', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
      http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://hyunhyunsubway.o-r.kr';
const USERNAME = 'hyunhyun@gmail.com';
const PASSWORD = 'hyunhyun';

export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


 // 로그인
  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
  sleep(1);

  // 경로 검색 화면 보기
  let path = http.get(`${BASE_URL}/path`);
  check(path, { 'path page': (resp) => resp.status == 200 });
  sleep(1);

  // 경로 검색
  let pathsSearch = http.get(`${BASE_URL}/paths/?source=2&target=4`);
  check(pathsSearch, { 'search path': (resp) => resp.status == 200 });
  sleep(1);

  // 즐겨찾기
  let favorites = http.get(`${BASE_URL}/favorites`, authHeaders);
  check(favorites, { 'view favorites': (resp) => resp.status == 200 });
  sleep(1);
};

