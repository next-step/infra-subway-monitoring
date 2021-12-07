import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';


export let options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "1m", target: 50 },
    { duration: "15s", target: 0 },
    { duration: "30s", target: 100 },
    { duration: "1m", target: 100 },
    { duration: "15s", target: 0 },
    { duration: "1m", target: 50 },
    { duration: "15s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<5000"], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://nhs0912-subway-infra.kro.kr';
const USERNAME = 'test@test.com';
const PASSWORD = '1234';

export default function ()  {
 let response = login();
 selectPath(response);
 sleep(1);
};

export function login(){

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

  return loginRes;
}

export function selectPath(loginRes){
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json('accessToken')}`,
    },
  };

  let myObjects = http.get(`${BASE_URL}/paths/?source=4&target=8`, authHeaders).json();
  check(myObjects,{"select path successfully " : (obj) => obj.distance ===13});

}

