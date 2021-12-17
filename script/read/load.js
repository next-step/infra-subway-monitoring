import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
  stages: [
    {duration: '1m', target: 50},
    {duration: '1m', target: 150},
    {duration: '50s', target: 100},
    {duration: '10s', target: 0},
  ],

  thresholds: {
    http_req_duration: ['p(99)<1000'],
  },
};

const BASE_URL = 'https://mnonm-subway.kro.kr';

export default function () {

  let pathObject = http.get(`${BASE_URL}/paths?source=206&target=280`).json();
  check(pathObject, {'retrieved path': (obj) => obj.id != 0});
  sleep(1);
};
