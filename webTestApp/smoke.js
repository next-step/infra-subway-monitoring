import http from 'k6/http';
import {check, sleep} from 'k6';
import {getRandomPathsQuery} from "./getRandomPathsQuery.js";

export let options = {
  stages: [
    // 35분 동안 평균 트래픽 이후 5분 안에 최고 트래픽으로 올라간 후 20분 유지
    { duration: '35m', target: 5 },
    { duration: '5m', target: 30 },
    { duration: '20m', target: 30 },
  ],
  thresholds: {
    // 상위 90% 는 0.6 초 미만 / 95% 는 0.7초 미만
    http_req_duration: ['p(90)< 600', 'p(95) < 700' ],
  },
};

const BASE_URL = 'https://xn--119-9j6nx7w.xn--h32bi4v.xn--3e0b707e';
const USERNAME = 'test@test.com';
const PASSWORD = 'test1234';

const jsonParams = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
  //1. 메인 페이지 접속
  check(http.get(BASE_URL), {
    '메인 페이지 접속 성공': (resp) => resp.status === 200
  });

  // 2. 로그인 페이지 접속
  check(http.get(`${BASE_URL}/login`), {
    '로그인 페이지 접속 성공': (resp) => resp.status === 200
  });

  // 3. 로그인 한번 실패
  check(http.post(`${BASE_URL}/login/token`, JSON.stringify({
    email: USERNAME,
    password: 'wrong password',
  }), jsonParams), {
    '로그인 한번 실패': (resp) => resp.status === 401
  });

  // 4. 로그인 성공
  const loginSuccessResponse = http.post(`${BASE_URL}/login/token`, JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  }), jsonParams);
  check(loginSuccessResponse, {
    '로그인 성공': (resp) => resp.status === 200
  });

  // 5. 경로 검색 페이지 접속
  check(http.get(`${BASE_URL}/path`), {
    '경로 검색 페이지 접속': (resp) => resp.status === 200
  });


  // 6. 경로 검색 버튼 클릭
  const randomPathsQuery = getRandomPathsQuery();
  check(http.get(`${BASE_URL}/paths?source=${randomPathsQuery.sourceId}&target=${randomPathsQuery.targetId}`), {
    '경로 검색 버튼 클릭': (resp) => resp.status === 200 && resp.json('distance') >= 0,
  });

  // 1초 대기
  sleep(1);
};
