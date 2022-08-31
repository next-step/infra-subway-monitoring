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
  pageCheck("main status",`${BASE_URL}`);

  pageCheck("loginPage status", `${BASE_URL}/login`);

  let token = login();

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${token.json('accessToken')}`,
    },
  };

  pageCheck("pathPage status", `${BASE_URL}/path`);

  sleep(1);

  pageCheck("mypage status", `${BASE_URL}/mypage`);

  sleep(1);
};

function pageCheck(pageMessage, url){
  const res = http.get(url);

  check(res, { pageMessage : (resp) => resp.status === 200 });
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