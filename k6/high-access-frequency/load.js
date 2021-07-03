import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '10s', target: 50 },
    { duration: '10s', target: 100 },
    { duration: '10s', target: 300 },
    { duration: '10s', target: 100 },
    { duration: '10s', target: 50 },
    { duration: '10s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://jhh992000.ddns.net';
const USERNAME = 'jhh992000@gmail.com';
const PASSWORD = '1234';

export default function ()  {
  let 메인페이지_접속_결과 = 메인페이지_접속_요청();
  메인페이지_접속_결과_확인(메인페이지_접속_결과);

  let 로그인_토큰 = 로그인_요청();
  로그인_확인(로그인_토큰);
};

export function 메인페이지_접속_요청() {
  return http.get(`${BASE_URL}`);
}
export function 메인페이지_접속_결과_확인(메인페이지_접속_결과) {
  check(메인페이지_접속_결과, {
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
    '로그인이 정상적으로 처리됨': (response) => response.json('accessToken') !== '',
  });
}