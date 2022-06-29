import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

const BASE_URL = 'https://lakey001.kro.kr';
const USERNAME = 't2@test.com';
const PASSWORD = 'test';

export default function() {
  //메인 페이지
  mainPage()

  //로그인
  let token = login();

  //정보수정
  changeMyInfo(token);

  //경로탐색
  searchPath(10, 100)

  sleep(1);
}

function mainPage(){
  let mainRes = http.get(`${BASE_URL}`);
  check(mainRes, {
    'go mainPage successfully': (resp) => resp.status == 200
  });
}

function login(){
  var payload = JSON.stringify({
    email: `${USERNAME}`,
    password: `${PASSWORD}`
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

  return loginRes.json('accessToken');
}

function changeMyInfo(accessToken) {
  var payload = JSON.stringify({
    email: `${USERNAME}`,
    password: `${PASSWORD}`,
    age: 50
  });

  let params = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  let changeInfoRes = http.put(`${BASE_URL}/members/me`, payload, params);
  check(changeInfoRes , {
      'changeInfo successfully': (response) => response.status === 200
  });
}

function searchPath(source, target){
  let pathRes = http.get(BASE_URL+'/path?source=' + source + '&target=' + target);
  check(pathRes, {
      'getPath successfully': (resp) => resp.status == 200
  } );
}
