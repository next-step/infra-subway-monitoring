import http from 'k6/http';
import { check, sleep } from 'k6';
import {BASE} from './Constant.js'

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(95)<1500'],
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

  params.headers['Authorization'] = `Bearer ${loginRes.json('accessToken')}`
  params.tags['name'] = 'update Member';

  let updateMember = http.put(`${BASE.URL}/members/me`, payload, params);
  check(updateMember, { 'update success': (obj) => obj.status === 200});

  sleep(1);
};
