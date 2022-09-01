import http from 'k6/http';
import { check, sleep } from 'k6';

// 평균 rps - 30 , 최대 rps - 75
export let options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 30 },
    { duration: '1m', target: 75 },
    { duration: '1m', target: 100 },
    { duration: '1m', target: 150 },
    { duration: '1m', target: 250 },
    { duration: '1m', target: 350 },
    { duration: '1m', target: 450 },
    { duration: '1m', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://sss-next-step.o-r.kr/';
const USERNAME = 'tlstjdtn321@naver.com';
const PASSWORD = '1234';

export default function ()  {
  //메인 페이지
  mainPage()

  //로그인
  let token = login();

  //정보수정
  changeMyInfo(token);

  //경로탐색
  searchPath(10, 100)

  sleep(1);
};

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