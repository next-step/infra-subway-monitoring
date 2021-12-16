import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

const HOST = {
  PROTOCOL : "http",
  URL : "3.36.233.76",
  PORT : "8080",
  USERNAME : "haedoang@gmail.com",
  PASSWORD : "11"
}

// smoke options 
// export let options = {
//   vus: 1, // 1 user looping for 1 minute
//   duration: '10s',

//   thresholds: {
//     http_req_duration: ['p(99) < 1500'], // 99% of requests must complete below 1.5s
//   },
// };

// load options
// export let options = {
//   stages: [
//     { duration: '1m', target: 50 }, 
//     { duration: '2m', target: 100 }, 
//     { duration: '10s', target: 80 }, 
//   ],
//   thresholds: {
//     http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
//     'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
//   },
// };


// stress
export let options = {
  vus: 200, // 1 user looping for 1 minute
  duration: '3m',
    thresholds: {
      http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};
const BASE_URL = `${HOST.PROTOCOL}://${HOST.URL}:${HOST.PORT}`;
const USERNAME = HOST.USERNAME;
const PASSWORD = HOST.PASSWORD;
export default function ()  {
    // 시나리오 2. 갱신 데이터 요청
    const before = new Date().getTime();
    const T = 2;

    var payload = JSON.stringify({
      email: USERNAME,
      password: PASSWORD,
    });
  
    var params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    //로그인  resposne
    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    check(loginRes, {
      'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });
  
    let authHeaders = {
      headers: {
        Authorization: `Bearer ${loginRes.json('accessToken')}`,
        'Content-Type': 'application/json',
      },
    };
  
    //마이페이지 response 
    let given = JSON.stringify({
      email: USERNAME,
      password: PASSWORD,
      age : randomIntBetween(1,1000)
    });
  
    let putMemberRes = http.put(`${BASE_URL}/members/me`, given, authHeaders);
    check(putMemberRes, { 'update member in successfully': (resp) => resp.status === 200 });
  
    const after = new Date().getTime();
    const diff = (after - before) / 1000;
    const remainder = T - diff;
    check(remainder, { 'reached request rate': remainder > 0 });
    if (remainder > 0) {
      sleep(remainder);
    } else {
      console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
    }
};