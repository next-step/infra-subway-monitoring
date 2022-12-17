import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
  stages: [
    {duration: '2m', target: 1},
    {duration: '2m', target: 30},
    {duration: '2m', target: 60},
    {duration: '2m', target: 90},
    {duration: '2m', target: 120},
    {duration: '2m', target: 150},
    {duration: '2m', target: 180},
    {duration: '2m', target: 210},
    {duration: '2m', target: 240},
    {duration: '2m', target: 270},
    {duration: '2m', target: 300},
    {duration: '1m', target: 1}
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://tech-pro.jimbae.com';
const USERNAME = 'jimbae@gmail.com';
const PASSWORD = 'qwer!@#$';

export default function () {

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
  check(myObjects, {'retrieved member': (obj) => obj.id != 0});

  let path = http.get(`${BASE_URL}/paths/?source=1&target=16`, authHeaders);
  check(path, {'find path': (path) => path.status === 200});

  let main = http.get(`${BASE_URL}`);
  check(main, {'retrieved main': (main) => main.status === 200});

  sleep(1);
};