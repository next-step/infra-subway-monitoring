import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
          { duration: '10s', target: 100 },
          { duration: '30s', target: 600 },
          { duration: '10s', target: 300 },
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

  let first = Math.random().toString().split('.')[1];
  let second = Math.random().toString().split('.')[1];
  let third = Math.random().toString().split('.')[1];
  let fourth = Math.random().toString().split('.')[1];
  let fifth = Math.random().toString().split('.')[1];
  let stationNumber = `${first}${second}${third}${fourth}${fifth}`
  let createStationUrl = `${BASE_URL}/stations`
  let createStationPayload = JSON.stringify({
    name: `station-${stationNumber}`
  });
  
  let createStationParameters = {
    headers: {        
        'Content-Type': 'application/json',
    },
  };
  
  let createStationResponse = http.post(createStationUrl, createStationPayload, createStationParameters);
  check(createStationResponse, {
    'created station successfully': (response) => response.status === 201,
  });
};
