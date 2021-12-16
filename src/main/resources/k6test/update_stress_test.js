import http from 'k6/http';
import { check, group, sleep } from 'k6';
import {BASE} from './Constant.js'

export const options = {
  stages: [
    { duration: '30s', target: 80 },
    { duration: '1m', target: 160 },
    { duration: '1m', target: 320 },
    { duration: '30s', target: 500 },
    { duration: '1m', target: 700 },
    { duration: '1m', target: 1000 },
    { duration: '1m', target: 800 },
    { duration: '1m', target: 1200 },
    { duration: '5m', target: 1500 },
    { duration: '4m', target: 1500 },
    { duration: '6m', target: 0 },
  ],
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
