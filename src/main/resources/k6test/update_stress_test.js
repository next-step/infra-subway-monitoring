import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 80 },
    { duration: '5s', target: 100 },
    { duration: '5s', target: 200 },
    { duration: '5s', target: 300 },
    { duration: '5s', target: 400 },
    { duration: '5s', target: 500 },
    { duration: '5s', target: 600 },
    { duration: '5s', target: 700 },
    { duration: '5s', target: 800 },
    { duration: '5s', target: 900 },
    { duration: '20s', target: 1100 },
    { duration: '15s', target: 1500 },
    { duration: '2m', target: 1500 },
    { duration: '3m', target: 0 },
  ],
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
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });


  const authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  const updateParams = params;

  const myObjects = http.put(`${BASE_URL}/members/me`, authHeaders, updateParams).json();
  check(myObjects, { '회원 존재 정상': (obj) => obj.id !== 0 });
  check(myObjects, { '회원 변경 정상': (obj) => obj.status === 200 });
  sleep(1);
};
