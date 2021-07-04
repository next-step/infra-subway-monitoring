import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(90)<400', 'p(95)<500', 'p(99)<600'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://woojang.n-e.kr';
const USERNAME = 'byunghakjang1230@gmail.com';
const PASSWORD = '1234';

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
  let myObjects1 = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  let myObjects2 = http.get(`${BASE_URL}/paths?source=1&target=5`, authHeaders).json();
  let myObjects3 = http.get(`${BASE_URL}/favorites`, authHeaders).json();
  check(myObjects1, { 'retrieved member': (obj) => obj.id != 0 });
  check(myObjects2, { 'find Paths': (obj) => obj.stations != null});
  check(myObjects3, { 'find Favorite Paths': (obj) => obj.size != 0});
  sleep(1);
};
