import http from 'k6/http';
import {check, sleep} from 'k6';
import {getRandomPathsQuery} from "./getRandomPathsQuery.js";

/**
 * 부하 테스트(loadTest)
 * 평균, 초대 트래픽 같은 적절한 부하를 발생시켜 정상적으로 서버가 동작하는지 확인하여 신뢰성을 얻는다.
 *
 *
 * 테스트 실행법
 * - 0부터 시작해서 천천히 최대 부하까지 올리기
 * - 최대에서 다시 0까지 천천히 부하를 내린다.
 */

/**
 * @type {Options}
 */
export let options = {
  stages: [
    { duration: '10m', target: 5 },
    { duration: '20m', target: 30 },
    { duration: '10m', target: 0 },
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
