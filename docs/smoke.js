import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 1500'],
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