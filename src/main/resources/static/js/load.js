// # Stress.js
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
      name: "LOAD TEST"
    }
  },
  scenarios: {
    loginTest: {
      executor: 'ramping-arrival-rate',
      exec: 'loginTest',
      preAllocatedVUs: 5,
      stages: [
        { duration: '30s', target: 6 },
        { duration: '1m', target: 13 },
        { duration: '1m', target: 17 },
        { duration: '3m', target: 40 },
        { duration: '1m', target: 13 },
        { duration: '1m', target: 13 },
        { duration: '10s', target: 0 },
      ],
    },

    noLoginTest: {
      executor: 'ramping-arrival-rate',
      exec: 'noLoginTest',
      preAllocatedVUs: 12,
      stages: [
        { duration: '30s', target: 6 },
        { duration: '1m', target: 13 },
        { duration: '1m', target: 17 },
        { duration: '3m', target: 40 },
        { duration: '1m', target: 13 },
        { duration: '1m', target: 13 },
        { duration: '10s', target: 0 },
      ]
    },
  }
};

const BASE_URL = 'https://web.iamsojung-webservice.o-r.kr/';
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
