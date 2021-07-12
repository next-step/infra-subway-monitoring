import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
      { duration: '1m', target: 5 },
      { duration: '30s', target: 10 },
      { duration: '1m', target: 67 },
      { duration: '20s', target: 25 },
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

  let source = Math.random().toString().split('.')[1];
  let target = Math.random().toString().split('.')[1];
  let findPath = `${BASE_URL}/paths?source=${source}&target=${target}`
  let findPathResponse = http.get(findPath);

  check(findPathResponse, {
    'find path successfully': (response) => response.status === 200,
});
};
