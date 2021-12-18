import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';


//"3.36.209.24"
const HOST = {
  PROTOCOL : "http",
  URL : "3.36.209.24",
  PORT : "8080",
  USERNAME : "haedoang@gmail.com",
  PASSWORD : "11"
}

// smoke options 
// export let options = {
//   vus: 1, // 1 user looping for 1 minute
//   duration: '10s',

//   thresholds: {
//     http_req_duration: ['p(99) < 1000'], // 99% of requests must complete below 1s
//   },
// };

// load options
// export let options = {
//   stages: [
//     { duration: '1m', target: 8 }, 
//     { duration: '2m', target: 88 }, 
//     { duration: '10s', target: 100 }, 
//   ],
//   thresholds: {
//     http_req_duration: ['p(99)<1000'],
//   },
// };


// stress
export let options = {
  vus: 150, // 1 user looping for 1 minute
  duration: '10s',
    thresholds: {
      http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = `${HOST.PROTOCOL}://${HOST.URL}:${HOST.PORT}`;

export default function ()  {
  // 시나리오 1. 접속 빈도가 높은 페이지 요청 
  const before = new Date().getTime();
  const T = 2;

  // request1) main page request
  http.get(`${BASE_URL}`);
  http.get(`${BASE_URL}/stations`);

  const after = new Date().getTime();
  const diff = (after - before) / 1000;
  const remainder = T - diff;
  check(remainder, { 'reached request rate': remainder > 0 });
  if (remainder > 0) {
    sleep(remainder);
  } else {
    console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
  }
};