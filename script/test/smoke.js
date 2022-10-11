import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<220'], // 99% of requests must complete below 220ms
  },
};

// 역 번호 범위 : 1 ~ 9
function getRandomInt() {
  return Math.floor(Math.random() * 10 + 1);
}

const BASE_URL = 'https://younghun-subway.kro.kr/';

export default function ()  {

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // 홈페이지 접근
  let homepage = http.get(`${BASE_URL}`,  params);
  check(homepage, {
    'homepage\'s status 200': (resp) => resp.status === 200,
  });

  // 경로 검색 탭 접근
  let station = http.get(`${BASE_URL}/stations`,  params);
  check(station, {
    'station\'s status 200': (resp) => resp.status === 200,
  });

  // 출발역 & 도착역 검색
  let source = getRandomInt();
  let target = getRandomInt();

  // 경로 검색
  let search = http.get(`${BASE_URL}/paths/?source=${source}&target=${target}`,  params);
  check(search, {
    'search\'s status 200': (resp) => resp.status === 200,
  });

  sleep(1);
};