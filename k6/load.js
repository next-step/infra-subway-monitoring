import http from 'k6/http'
import {sleep} from 'k6'

export const options = {
  vus: 1, // virtual users
  duration: '30s', // 반복 주기

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(99)<1500'],
  },
};

const BASE_URL = 'https://giyeon95.kro.kr';
const USERNAME = 'giyeon95';
const PASSWORD = 'password';

export default function () {

  // 메인 조회
  http.get(`${BASE_URL}`);

  // 경로 검색
  http.get(`${BASE_URL}/path`);

  // 역 목록 조회
  http.get(`${BASE_URL}/stations`);

  // 최단거리 검색
  http.get(`${BASE_URL}/paths?source=7&target=5`);

  sleep(1);
}