import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};


export default function () {
  const BASE_URL = 'https://www.subwayinfra.p-e.kr'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/paths?source=344&target=383`, null, { tags: { name: '첫번째 짧은경로 탐색' } }],
    ['GET', `${BASE_URL}/paths?source=344&target=380`, null, { tags: { name: '두번째 넓은경로 탐색' } }],
  ]);

  responses.forEach(function(response) {
    check(response, { // use response here
      '경로탐색 정상': (r)=> r.status === 200
    });
  });
  sleep(1);
}