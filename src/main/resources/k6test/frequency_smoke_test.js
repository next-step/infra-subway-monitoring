import http from 'k6/http';
import { sleep, check} from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },

};

export default function () {
  const BASE_URL = 'https://www.subwayinfra.p-e.kr'; // make sure this is not production
  const myObjects = http.get(`${BASE_URL}/`)
  check(myObjects, { 'mainpage': (obj) => obj.status === 200 });
  sleep(1);
}
