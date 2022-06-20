import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
         { duration: '5s', target: 10 },
         { duration: '30s', target: 20 },
         { duration: '30m', target: 30 },
         { duration: '30s', target: 20 },
         { duration: '5s', target: 0 }
     ],

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://jhsong2580.kro.kr';
const USERNAME = 'thdwmdgns@naver.com';
const PASSWORD = 'Tacgu6-tonhiv-baqdes';


export default function ()  {
  accessIndex();

  let token = login(USERNAME, PASSWORD);

  getPath(token, 1, 10);

  sleep(1);
};





function login(id, pw)  {

  var payload = JSON.stringify({
    email: id,
    password: pw,
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

  let token = loginRes.json('accessToken');
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });

  return token;
};



function getPath(token, source, target)  {

  var params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };


  let pathRes = http.get(`${BASE_URL}/path?source=${source}&target=${target}`, params);

  check(pathRes, {
    'getData Success': (resp) => resp.status === 200,
  });

};



function accessIndex()  {

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  let pathRes = http.get(`${BASE_URL}`, params);

  check(pathRes, {
    'indexPageAccess': (resp) => resp.status === 200,
  });

};
