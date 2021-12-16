import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [

    { duration: '30s', target: 80 }, // 5분동안 1명의 사용자에서 100의 사용자로 증가
    { duration: '50s', target: 80 }, // 10분동안 100명
    { duration: '30s', target: 0 }, // 0명으로감소
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 요청의 99%는 1.5초 이내에 해결
    'logged in successfully': ['p(99)<1500'], // 요청의 99% 1.5 이내에 완료해야한다.
  },
};

export default function ()  {
  const BASE_URL = 'https://www.subwayinfra.p-e.kr';

  const myObjects = http.get(`${BASE_URL}`)
  check(myObjects, { 'mainpage': (obj) => obj.status === 200 });
  sleep(1);
};
