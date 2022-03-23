import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';

export let options = {
  vus: 100, 
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://guswns1659-infra.kro.kr';

export default function ()  {

  const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJndXN3bnMxNjU5QGdtYWlsLmNvbSIsImlhdCI6MTY0Nzg5ODQ5MywiZXhwIjoxNjQ3OTAyMDkzfQ.9xE5f_1DVoTWU8GECJgYFbQatJvEdXBiemYeykmYw0o';

  let authHeaders = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  
  const url = new URL(`${BASE_URL}/paths/`);
  url.searchParams.append('source', '3');  
  url.searchParams.append('target', '7');  

  let myObjects = http.get(url.toString(), authHeaders).json();
  check(myObjects, { 'retrieved member': (obj) => obj.stations.length != 0 });
  sleep(1);
};

