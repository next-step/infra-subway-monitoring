import http from 'k6/http';
import {check} from 'k6';

export let options = {
  threshold: {
    http_req_duration: ['p(99)<1000'],
  },
  stages: [
    {duration: '5s', target: 185},
    {duration: '30s', target: 185},
    {duration: '5s', target: 230},
    {duration: '30s', target: 230},
    {duration: '5s', target: 275},
    {duration: '30s', target: 275},
    {duration: '5s', target: 0},
  ],
};

const BASE_URL = 'https://meeingjae-subway.kro.kr/';

export default function() {

  const mainRes = http.get(`${BASE_URL}`);

  check(mainRes, {
    'is success': (r) => r.status === 200,
  });

  check(mainRes, {
    'is failed': (r) => r.status !== 200,
  });
}