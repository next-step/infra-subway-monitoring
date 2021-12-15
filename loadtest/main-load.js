import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
  stages: [
    {duration: '5s', target: 50},
    {duration: '10s', target: 100},
    {duration: '20s', target: 100},
    {duration: '10s', target: 0},
  ],
  thresholds: {
    http_req_duration: ['p(99)<1000'],
  },
};

const BASE_URL = 'https://chaeyun17.p-e.kr';

export default function () {
  const mainResponse = http.get(`${BASE_URL}`);
  check(mainResponse, {
    'load main page': response => response.status === 200
  });
  sleep(1);
}
