import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 12 },
    { duration: '1m', target: 14 },
    { duration: '1m', target: 100 },
    { duration: '1m', target: 150 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
      http_req_duration: ['p(99)<3100'],
  },
};

const BASE_URL = 'https://www.yoonmin-kim.r-e.kr';
const USERNAME = 'test@kakao.com';
const PASSWORD = '1234';

export default () => {
  let loginRes = login();
  mainPage();
  members(loginRes);
  path();
  paths();
  sleep(1);
};

const login = () => {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'login successfully': (res) => res.json('accessToken') !== '',
  });

  return loginRes;
}

const mainPage = () => {
  let mainPage = http.get(`${BASE_URL}`);
  check(mainPage, {
    'main page successfully': (res) => res.status === 200
  });
}

const members = (loginRes) => {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
}

const path = () => {
  let path = http.get(`${BASE_URL}/path`);
  check(path, {
    'path successfully': (res) => res.status === 200
  });
}

const paths = () => {
  let paths = http.get(`${BASE_URL}/paths?source=1&target=2`);
  check(paths, {
    'paths successfully': (res) => res.status === 200
  });
}