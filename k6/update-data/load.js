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

export default function ()  {
  let 메인페이지_접속_결과 = 메인페이지_접속_요청();
  메인페이지_접속_결과_확인(메인페이지_접속_결과);

  let 회원가입_결과 = 회원가입_요청();
  회원가입_결과_확인(회원가입_결과);
};

export function 메인페이지_접속_요청() {
  return http.get(`${BASE_URL}`);
}
export function 메인페이지_접속_결과_확인(메인페이지_접속_결과) {
  check(메인페이지_접속_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}
export function 회원가입_요청() {
  var payload = JSON.stringify({
    email: guid() + "@gmail.com",
    age: "99",
    password: "1234"
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return http.post(`${BASE_URL}/members`, payload, params);
}
export function 회원가입_결과_확인(회원가입_결과) {
  check(회원가입_결과, {
    '회원가입이 정상적으로 처리됨': (response) => response.status === 201
  });
}
export function guid() {
  function s4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}