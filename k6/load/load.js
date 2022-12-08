/* load.js */
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
      { duration: '2m', target: 1 },
      { duration: '8m', target: 5 },
      { duration: '10m', target: 10 },
      { duration: '8m', target: 5 },
      { duration: '2m', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
  },
};

const BASE_URL = 'https://dongha-byun-subway-1.kro.kr';
const USERNAME = 'byun@naver.com';
const PASSWORD = 'byun123';

export default function ()  {

  pathSearch();
  pathSearchByAuthorizedUser(login());

  sleep(1);
};

function login(){
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

  return loginRes.json('accessToken');
}

function pathSearch(){
  let myObjects = http.get(`${BASE_URL}/paths?source=2&target=105`);
  check(myObjects, {
    'search path success': (obj) => obj.status === 200
  });
}

function pathSearchByAuthorizedUser(accessToken){
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let myObjects = http.get(`${BASE_URL}/paths?source=2&target=105`, authHeaders);
  check(myObjects, {
    'search path authorized user success': (obj) => obj.status === 200
  });
}
