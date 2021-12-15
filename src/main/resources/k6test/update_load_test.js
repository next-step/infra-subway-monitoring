import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  stages: [

    { duration: '1m', target: 80 }, // 5분동안 1명의 사용자에서 100의 사용자로 증가
    { duration: '2m', target: 80 }, // 10분동안 100명
    { duration: '1m', target: 0 }, // 0명으로감소
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 요청의 99%는 1.5초 이내에 해결
    'logged in successfully': ['p(99)<1500'], // 요청의 99% 1.5 이내에 완료해야한다.
  },
};

const BASE_URL = 'https://www.subwayinfra.p-e.kr';
const USERNAME = 'subwaytest@gmail.com';
const PASSWORD = '123'


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


  const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });


  const authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  const updateParams = params;

  const myObjects = http.put(`${BASE_URL}/members/me`, authHeaders, updateParams).json();
  check(myObjects, { 'response member': (obj) => obj.id !== 0 });
  sleep(1);
};
