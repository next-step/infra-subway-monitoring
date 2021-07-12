import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
      { duration: '10s', target: 20 },
      { duration: '10s', target: 40 },
      { duration: '10s', target: 60 },
      { duration: '10s', target: 80 },
      { duration: '10s', target: 100 },
      { duration: '10s', target: 0 },
      ],
    thresholds: {
      http_req_duration: ['p(99)<100'], 
    },
  };

const BASE_URL = 'https://chae-yh-domain.kro.kr';
const USERNAME = 'abc@yahoo.com';
const PASSWORD = '12345';

export default function ()  {

  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };
  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
  sleep(1);
};
