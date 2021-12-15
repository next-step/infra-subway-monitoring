import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  stages: [

    { duration: '1m', target: 80 }, // 5분동안 1명의 사용자에서 100의 사용자로 증가
    { duration: '2m', target: 80 }, // 10분동안 100명
    { duration: '1m', target: 0 }, // 0명으로감소
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 요청의 99%는 1.5초 이내에 해결
    'logged in successfully': ['p(99)<1500'], // 요청의 99% 1.5 이내에 완료해야한다.
  },
};

export default function () {
  const BASE_URL = 'https://www.subwayinfra.p-e.kr'; // make sure this is not production
  const myObjects = http.get(`${BASE_URL}/paths?source=344&target=383`)
  check(myObjects, { '경로찾기정상': (obj) => obj.status === 200 });
  sleep(1);
}
