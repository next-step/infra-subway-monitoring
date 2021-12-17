import http from 'k6/http';
import {check, sleep} from 'k6';

const BASE_URL = 'https://wooobo.kro.kr';

export let options = {
  stages: [
    {duration: "1m", target: 100},
    {duration: "1m", target: 200},
    {duration: "2m", target: 200},
    {duration: "3m", target: 400},
    {duration: "2m", target: 510},
    {duration: "1m", target: 800},
    {duration: "2m", target: 0}
  ],

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
