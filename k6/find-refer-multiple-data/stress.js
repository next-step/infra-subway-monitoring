import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '5s', target: 50 },
    { duration: '10s', target: 200 },
    { duration: '10s', target: 400 },
    { duration: '10s', target: 300 },
    { duration: '10s', target: 500 },
    { duration: '5s', target: 200 },
    { duration: '5s', target: 50 },
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

  let 나의_즐겨찾기_목록_조회_결과 = 나의_즐겨찾기_목록_조회_요청(로그인_토큰);
  let 나의_첫번째_즐겨찾기 = 나의_즐겨찾기_목록_조회_결과_확인(나의_즐겨찾기_목록_조회_결과);

  let 경로_검색_결과 = 경로_검색_요청(로그인_토큰, 나의_첫번째_즐겨찾기.source, 나의_첫번째_즐겨찾기.target);
  경로_검색_결과_확인(경로_검색_결과);
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
    '로그인이 정상적으로 처리됨': (resp) => resp.json('accessToken') !== '',
  });
}
export function 나의_즐겨찾기_목록_조회_요청(로그인_토큰) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${로그인_토큰.json('accessToken')}`,
    },
  };
  return http.get(`${BASE_URL}/favorites`, authHeaders).json();
}
export function 나의_즐겨찾기_목록_조회_결과_확인(나의_즐겨찾기_목록_조회_결과) {
  check(나의_즐겨찾기_목록_조회_결과, {
    '나의 즐겨찾기 목록이 정상적으로 조회됨': (response) => response.length > 0
  });
  return 나의_즐겨찾기_목록_조회_결과[0];
}
export function 경로_검색_요청(로그인_토큰, 출발역, 도착역) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${로그인_토큰.json('accessToken')}`,
    },
  };
  return http.get(`${BASE_URL}/paths?source=` + 출발역.id + `&target=` + 도착역.id, authHeaders);
}
export function 경로_검색_결과_확인(경로_검색_결과) {
  check(경로_검색_결과, {
    '경로가 정상적으로 검색됨': (response) => response.json('stations').length > 0
  });
}