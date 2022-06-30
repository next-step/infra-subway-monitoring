import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://bestsilver-step1.o-r.kr/';
const USERNAME = 'bestsilver@nextstep.com';
const PASSWORD = 'bestsilver';

export default function ()  {
  goToMainPage();
  goToLoginPage();
  let accessToken = login();
  getMyInfo(accessToken);
  goToPathPage();
  findPath(accessToken);
  
  sleep(1);
};

function goToMainPage() {
  let mainPageRes = http.get(BASE_URL);

  check(mainPageRes, {
    'goToMainPage in successfully': (resp) => resp.status === 200,
  })
}

function goToLoginPage() {
  let loginPageRes = http.get(`${BASE_URL}/login`);

  check(loginPageRes, {
    'goToLoginPage in successfully': (resp) => resp.status === 200,
  })  
}

function login() {
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

  return loginRes.json('accessToken')
}

function getMyInfo(accessToken) {
  let params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  };

  let myInfoRes = http.post(`${BASE_URL}/members/me`, params).json();
  check(myInfoRes, {'retrieved getMyInfo ' : (obj) => obj.id != 0 });
}


function goToPathPage() {
  let pathPageRes = http.get(`${BASE_URL}/path`);

  check(pathPageRes, {
    'goToLoginPage in successfully': (resp) => resp.status === 200,
  })  
}

function findPath(accessToken) {
  let params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  };
  let findPathRes = http.get(`${BASE_URL}/path?source=1&target=2`, params);

  check(findPathRes, {'findPath in successfully' : (resp) => resp.status === 200 });
}