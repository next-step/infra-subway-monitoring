import http from 'k6/http';
import { check, sleep } from 'k6';
import {BASE} from './Constant.js'

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

export default function ()  {
  const payload = JSON.stringify({
    email: BASE.USERNAME,
    password: BASE.PASSWORD,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'dataType': 'json'
    },
    tags: {
      name: 'login',
    },
  };

  const loginRes = http.post(`${BASE.URL}/login/token`, payload, params);

  check(loginRes, {
    'login is success': (resp) => resp.json('accessToken') !== ''
  });

  sleep(1);

  // 멤버 업데이트
  params.headers['Authorization'] = `Bearer ${loginRes.json('accessToken')}`
  params.tags['name'] = 'update Member';

  let updateMember = http.put(`${BASE.URL}/members/me`, payload, params);
  check(updateMember, { 'update success': (obj) => obj.status === 200});

  sleep(1);
};
