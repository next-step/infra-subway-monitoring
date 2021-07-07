import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
      { duration: '5s', target: 100 },
      { duration: '20s', target: 200 }, 
      { duration: '5s', target: 300 }, 
      { duration: '20s', target: 400 },
      { duration: '5s', target: 500 },
      { duration: '20s', target: 600 },      
      { duration: '5s', target: 0 }
  ],
  thresholds: {
      http_req_duration: ['p(99)<1500'],
  },
};

const BASE_URL = 'https://xn--vo5b68lv7b.xn--yq5b.xn--3e0b707e/';
const USERNAME = 'mskang@nextstep.com';
const PASSWORD = '1234';

export default function ()  {

  const loginRes = 로그인_요청();
  로그인_검증됨(loginRes);

  const myObjects = 나의정보_조회_요청(loginRes);
  나의정보_검증됨(myObjects);
  
  const pathsRes = 경로_조회_요청(loginRes, 7, 9); //강변역 -> 서초역
  경로_검증됨(pathsRes, 20); //20km

  sleep(1);
};

export function 로그인_요청() {
  var payload = JSON.stringify({
      email: USERNAME,
      password: PASSWORD,
  });

  var params = {
      headers: {
          'Content-Type': 'application/json',
      },
  };

  return http.post(`${BASE_URL}/login/token`, payload, params);
}

export function 로그인_검증됨(loginRes) {
  check(loginRes, {
      'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });
}

export function 나의정보_조회_요청(loginRes) {
  let authHeaders = {
      headers: {
          Authorization: `Bearer ${loginRes.json('accessToken')}`,
      },
  };

  return http.get(`${BASE_URL}/members/me`, authHeaders).json();
}

export function 나의정보_검증됨(myObjects) {
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
}

export function 경로_조회_요청(loginRes, source, target) {
  let authHeaders = {
      headers: {
          Authorization: `Bearer ${loginRes.json('accessToken')}`,
      },
  };

  return http.get(`${BASE_URL}/paths/?source=` + source + `&target=`+target, authHeaders).json();
}

export function 경로_검증됨(pathsRes, distance) {
  check(pathsRes, {
      'get shortest line success': (resp) => resp['distance'] == distance,
  });
}