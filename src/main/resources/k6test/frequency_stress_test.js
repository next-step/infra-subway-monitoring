import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 80 },
    { duration: '5s', target: 100 },
    { duration: '5s', target: 200 },
    { duration: '5s', target: 300 },
    { duration: '5s', target: 400 },
    { duration: '5s', target: 500 },
    { duration: '5s', target: 600 },
    { duration: '5s', target: 700 },
    { duration: '5s', target: 800 },
    { duration: '5s', target: 900 },
    { duration: '20s', target: 1100 },
    { duration: '15s', target: 1500 },
    { duration: '2m', target: 1500 }, //
    { duration: '3m', target: 0 },
  ],
};

export default function () {
  const BASE_URL = 'https://www.subwayinfra.p-e.kr';

  const responses = http.batch([
    ['GET', `${BASE_URL}`, { tags: { name: 'mainpage' } }],
    ['GET', `${BASE_URL}`, { tags: { name: 'mainpage' } }],
  ]);
  check(responses, { '메인페이지 접속 정상': (obj) => obj.status === 200 });
  sleep(1);
}