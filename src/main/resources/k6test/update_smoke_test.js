import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(95)<1500'],
  },
};

const BASE_URL = 'https://www.subwayinfra.p-e.kr';
const USERNAME = 'subwaytest@gmail.com';
const PASSWORD = '123';

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
    'logged in successfully': (resp) => resp.json('accessToken') !== ''
  });

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`
    },
  };

  const updateParams = params;

  const myObjects = http.put(`${BASE_URL}/members/me`, authHeaders, updateParams).json();
  check(myObjects, { 'update Member': (obj) => obj.id !== 0 });
  sleep(1);
};
