import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 80 },
    { duration: '5s', target: 100 },
    { duration: '5s', target: 200 },
    { duration: '5s', target: 200 },
    { duration: '5s', target: 400 },
    { duration: '5s', target: 400 },
    { duration: '5s', target: 500 },
    { duration: '5s', target: 500 },
    { duration: '5s', target: 600 },
    { duration: '5s', target: 600 },
    { duration: '5s', target: 900 },
    { duration: '5s', target: 900 },
    { duration: '5s', target: 1200 },
    { duration: '20s', target: 1700 },
    { duration: '10s', target: 1950 },
    { duration: '30s', target: 1950 },
    { duration: '30s', target: 2250 },
    { duration: '10m', target: 3050 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 요청의 99%는 1.5초 이내에 해결
    'logged in successfully': ['p(99)<1500'], // 요청의 99% 1.5 이내에 완료해야한다.
  },
};

export default function () {
  const BASE_URL = 'https://www.subwayinfra.p-e.kr';

  const responses = http.batch([
    ['GET', `${BASE_URL}/paths?source=344&target=383`, null, { tags: { name: '짧은 거리 탐색' } }],
    ['GET', `${BASE_URL}/paths?source=344&target=380`, null, { tags: { name: '긴 거리 탐색' } }],
    ['GET', `${BASE_URL}/paths?source=344&target=363`, null, { tags: { name: '보통 거리 탐색' } }],
  ]);

  responses.forEach(function(response) {
    check(response, { // use response here
      '경로탐색 정상': (r)=> r.status === 200
    });
  });
  sleep(1);
}