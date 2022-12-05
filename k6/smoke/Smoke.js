// # smoke.js
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 10, // 1 user looping for 1 minute
  duration: '60s',

  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 1.5s
  },
};


const BASE_URL = 'https://sawooook-webservice.p-e.kr';
const USERNAME = 'test@naver.com';
const PASSWORD = 'test1234';

export default function ()  {

  const payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  // 로그인
  const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    '로그인 페이지': (resp) => resp.json('accessToken') !== '',
  });


  // 경로 페이지 검색
  const getPath = http.get(`${BASE_URL}/path`);

  check(getPath, {
    '경로 검색 페이지': (response) => response.status === 200,
  });


  // 인증헤더
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  let findPathResponse = http.get(`${BASE_URL}/paths?source=5&target=8`, authHeaders);

  check(findPathResponse, {
    '경로 검색하기': (response) => response.status === 200,
  });
};

