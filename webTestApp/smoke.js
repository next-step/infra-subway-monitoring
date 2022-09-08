import http from 'k6/http';
import {check, sleep} from 'k6';
import {getRandomPathsQuery} from "./getRandomPathsQuery.js";

/**
 * 스모크 테스트 (smokeTest)
 * 최소 부하로 기능에 문제가 없는지 확인하거나 테스트 스크립트가 정상 작동하는지 테스트 한다.
 */

/**
 * @type {Options}
 */
export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(99)<700']
  }
}


const BASE_URL = 'https://xn--119-9j6nx7w.xn--h32bi4v.xn--3e0b707e';
const USERNAME = 'test@test.com';
const PASSWORD = 'test1234';


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
  sleep(1);
}


