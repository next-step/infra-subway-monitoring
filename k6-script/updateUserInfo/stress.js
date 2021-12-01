import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../config/TestInfo.js';

export let options = {
  stages: [
    { duration: '5s', target: 1 },
    { duration: '5s', target: 4 },
    { duration: '10s', target: 13 },
    { duration: '10s', target: 20 },
    { duration: '10s', target: 13 },
    { duration: '5s', target: 8 },
    { duration: '10s', target: 0 }
  ],

  thresholds: {
  http_req_duration: ['p(99)<100'],
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);

  let 로그인_토큰 = 로그인_요청();
  로그인_확인(로그인_토큰);

  let 유저정보_변경_결과 = 유저정보_변경_요청(로그인_토큰, 30);
  유저정보_변경_결과확인(유저정보_변경_결과);
};

export function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}

export function 로그인_요청() {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return http.post(`${BASE_URL}/login/token`, payload, params);
}

export function 로그인_확인(로그인_토큰) {
  check(로그인_토큰, {
    '로그인페이지가 정상적으로 응답함': (response) => response.status === 200,
    '로그인이 정상적으로 처리됨': (response) => response.json('accessToken') !== '',
  });
}

export function 유저정보_변경_요청(로그인_토큰, 변경된나이) {
  let params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${로그인_토큰.json('accessToken')}`,
    },
  };

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
    age: 변경된나이,
  });

  return http.put(`${BASE_URL}//members/me`, payload, params);
}

export function 유저정보_변경_결과확인(유저정보_변경_결과) {
  check(유저정보_변경_결과, {
    '유저정보가 정상적으로 변경됨': (response) => response.status === 200
  });
}