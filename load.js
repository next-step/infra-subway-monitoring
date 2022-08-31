import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 10 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<200'],
  },
};

const BASE_URL = 'https://인쿠26.메인.한국/';
const USERNAME = 'ingus26@gmail.com';
const PASSWORD = '1234';

export default function ()  {
  main()

  loginPage()

  let token = login();

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${token.json('accessToken')}`,
    },
  };

  pathPage()

  sleep(1);

  myPage()

  sleep(1);
};

function main(){
  const res = http.get(`${BASE_URL}`);

  check(res, { 'main page' : (resp) => resp.status === 200 });
}

function loginPage(){
  const res = http.get(`${BASE_URL}/login`);

  check(res, { 'login page' : (resp) => resp.status === 200 });
}

function pathPage(){
  const res = http.get(`${BASE_URL}/path`);

  check(res, { 'path page' : (resp) => resp.status === 200 });
}

function myPage(){
  const res = http.get(`${BASE_URL}/mypage`);

  check(res, { 'mypage' : (resp) => resp.status === 200 });
}

function login(){
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
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

  return loginRes;
}