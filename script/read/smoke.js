import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

const BASE_URL = 'https://mnonm-subway.kro.kr';

export default function () {

  let pathObject = http.get(`${BASE_URL}/paths?source=206&target=280`).json();
  check(pathObject, {'retrieved path': (obj) => obj.id != 0});
  sleep(1);
};
