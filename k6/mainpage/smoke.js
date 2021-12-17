import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

const BASE_URL = 'http://localhost:8080';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'],
  },
};

export default function () {
  let pageResponse = http.get(BASE_URL);
  check(pageResponse,
      {'page load success': (response) => response.status === 200});
  sleep(1);
};
