import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://next-bada.n-e.kr/';
const USERNAME = 'tester@test.com';
const PASSWORD = 'test123';
const STATION_MAX_COUNT = 727;
const STATION_MIN_COUNT = 1;

export default function task()  {
  openMainPage();
  const token = login();
  findMyInfo(token);
  openPathPage();
  findShortestPath(token);
  sleep(1);
};

function openMainPage(){
  check(http.get(`${BASE_URL}`), {
    'open main page success': res=>res.status === 200
  })
}

function getRandomStationId() {
  return Math.floor(Math.random() * (STATION_MAX_COUNT - STATION_MIN_COUNT) + STATION_MIN_COUNT)
}
function login(){
  const payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    }};
  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });
  return loginRes.json('accessToken')
}

function findMyInfo(accessToken) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let myInfo = http.get(`${BASE_URL}/members/me`, authHeaders).json();

  check(myInfo, { 'retrieved member successfully': (obj) => obj.id != 0 });
}

function openPathPage(){
  check(http.get(`${BASE_URL}/path`), {
    'open path page success': res=>res.status === 200
  })
}

function findShortestPath(accessToken){
  const authHeaders = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  let findPathResponse = http.get(`${BASE_URL}/path?source=${getRandomStationId()}&target=${getRandomStationId()}`, authHeaders); // 용산역 -> 영등포
  check(findPathResponse, {
    'search shortest path successfully': (response) => response.status === 200
  })
}