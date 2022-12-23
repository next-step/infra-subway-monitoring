// # smoke.js
import http from 'k6/http';
import {check} from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


export let options = {
  thresholds: {
    http_req_duration: ['p(95)<300'],
  },
  ext: {
    loadimpact: {
      projectID: "******",
      name: "SMOKE TEST"
    }
  },
  scenarios: {
    loginTest: {
      executor: 'constant-vus',
      exec: 'loginTest',
      vus: 5,
      duration: '60s',
    },

    noLoginTest: {
      executor: 'constant-vus',
      exec: 'noLoginTest',
      vus: 12,
      duration: '60s',
    },
  }
};

const BASE_URL = 'http://3.39.154.48:8080/';
const USERNAME = '123@email.com';
const PASSWORD = '123';

function sourceRandomNumber() {
  return randomIntBetween(4, 5)
}

function targetRandomNumber() {
  return randomIntBetween(6, 8)
}

function loginPage() {
  const payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // 로그인
  const response = http.post(`${BASE_URL}/login/token`, payload, params);

  check(response, {
    '로그인 페이지': (resp) => resp.json('accessToken') !== '',
  }, {tags: '로그인 페이지'});


  return {
    headers: {
      Authorization: `Bearer ${response.json('accessToken')}`,
    },
  };
}

function searchPath() {
  let source = sourceRandomNumber();
  let target = targetRandomNumber();

  let findPathResponse = http.get(`${BASE_URL}/paths?source=${source}&target=${target}`);

  check(findPathResponse, {
    '경로 검색하기': (response) => response.status === 200,
  }, {tags: '경로 검색하기'});
}

function searchPathPage() {
  // 경로 페이지 검색
  const getPath = http.get(`${BASE_URL}/path`);

  check(getPath, {
    '경로 검색 페이지': (response) => response.status === 200,
  }, {tags: '경로 검색 페이지'});
}


export function loginTest() {
  loginPage();
  searchPath();
  searchPathPage();
}

export function noLoginTest() {
  searchPath();
  searchPathPage();
}
