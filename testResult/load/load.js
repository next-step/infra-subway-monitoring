import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10m', target: 76 }, // simulate ramp-up of traffic from 1 to 76 users over 10 minutes
        { duration: '20m', target: 230 }, // ramp-up to 230 users over 20 minutes
        { duration: '10m', target: 230 }, // stay at 230 users for 10 minutes
        { duration: '20m', target: 76 }, // stay at 76 users for  20minutes
        { duration: '5m', target: 0 }, // ramp-down to 0 users
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

