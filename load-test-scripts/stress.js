import http from 'k6/http';
import {check} from 'k6';

export let options = {
  threshold: {
    http_req_duration: ['p(99)<1500'],
  },
  stages: [
    {duration: '15s', target: 200},
    {duration: '30s', target: 200},
    {duration: '15s', target: 220},
    {duration: '30s', target: 220},
    {duration: '15s', target: 240},
    {duration: '30s', target: 240},
    {duration: '15s', target: 260},
    {duration: '30s', target: 260},
    {duration: '1m', target: 0},
  ],
};

const BASE_URL = 'https://happy-subway.kro.kr';
const SOURCE_STATION_ID = '1';
const TARGET_STATION_ID = '50';

export default function() {

  let pathRes = http.get(
      `${BASE_URL}/paths?source=${SOURCE_STATION_ID}&target=${TARGET_STATION_ID}`);

  check(pathRes, {
    'is success': (r) => r.status === 200,
  });
}
