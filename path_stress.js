import http from 'k6/http';
import {check} from 'k6';

export let options = {
  threshold: {
    http_req_duration: ['p(99)<1000'],
  },
  stages: [
    {duration: '5s', target: 185},
    {duration: '30s', target: 185},
    {duration: '5s', target: 225},
    {duration: '30s', target: 225},
    {duration: '5s', target: 250},
    {duration: '30s', target: 250},
    {duration: '5s', target: 275},
    {duration: '30s', target: 275},
    {duration: '5s', target: 0},
  ],
};

const BASE_URL = 'https://meeingjae-subway.kro.kr';
const SOURCE_STATION_ID = '1';
const TARGET_STATION_ID = '16';

export default function() {

  let pathRes = http.get(
      `${BASE_URL}/paths?source=${SOURCE_STATION_ID}&target=${TARGET_STATION_ID}`);

  check(pathRes, {
    'is success': (r) => r.status === 200,
  });

  check(pathRes, {
    'is failed': (r) => r.status !== 200,
  });
}
