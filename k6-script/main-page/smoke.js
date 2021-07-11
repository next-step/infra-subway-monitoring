import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://fdevjc-subway.kro.kr/';
const USERNAME = 'fdevjc@gmail.com';
const PASSWORD = '123';

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);

  let 로그인_토큰 = 로그인_요청();
  로그인_확인(로그인_토큰);
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
    '로그인이 정상적으로 처리됨': (response) => response.json('accessToken') !== '',
  });
}