import http from 'k6/http';
import {check, sleep} from 'k6';
import {getRandomPathsQuery} from "./getRandomPathsQuery.js";

/**
 * 스트레스 테스트는 극한 조건 에서 시스템의 안정성과 신뢰성을 검증 하기 위함이다.
 * 트래픽이 많이 생기는 할인 행사, 기념일 같은 특정날이 을때 자신의 서버가 어떻게 트래픽을 처리하는지 시뮬레이션 확인할수 있다.
 *
 * 스트레스 테스트 목적
 * - 극한 조건에서 시스템이 작동하는 방식.
 * - 사용자 또는 처리량 측면에서 시스템의 최대 용량 확인
 * - 시스템의 한계점과 실패 환경 확인
 * - 스트레스 테스트가 끝난 후 시스템의 자동 복구 여부
 */

/**
 * @type {Options}
 */
export const options = {
  stages: [
    {duration: '1m', target: 20},
    {duration: '3m', target: 30},
    {duration: '3m', target: 90},
    {duration: '5m', target: 180},
    {duration: '3m', target: 90},
    {duration: '3m', target: 30},
    {duration: '3m', target: 10},
    {duration: '3m', target: 0},
  ],
}

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
  sleep(1);
}


