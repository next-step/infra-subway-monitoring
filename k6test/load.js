import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {

  stages: [
    { duration: '5m', target: 2 },
    { duration: '5m', target: 4 },
    { duration: '5m', target: 6 },
    { duration: '5m', target: 6 },
    { duration: '5m', target: 4 },
    { duration: '5m', target: 2 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<600'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://xn----q45e87j52va858lloijxc.xn--hk3b17f.xn--3e0b707e';
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function ()  {

  // Request Randing page
  let landingPageRes = http.get(`${BASE_URL}`)
  check(landingPageRes, {"Randing page status check" : (resp) => resp.status === 200});

  // Request Path api
  let pathPageRes = http.get(`${BASE_URL}/path`)
  check(pathPageRes, {"Paths Page status check" : (resp) => resp.status === 200});

  // Request Path api
  let source = 1;
  let target = 2;
  let pathRes = http.get(`${BASE_URL}/path/?source=${source}&target=${target}`, params);
  check(pathRes, {"Path api status check" : (resp) => resp.status === 200});

};
