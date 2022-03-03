import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '5m', target: 200 },
    { duration: '5m', target: 300 },
    { duration: '10m', target: 400 },
    { duration: '10m', target: 0 }
  ],
};


const BASE_URL = 'https://guswnt.p-e.kr';
export default () => {
  const res = http.get(`${BASE_URL}/path`);
  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  const object= http.get(`${BASE_URL}/paths/?source=2&target=4`).json();
  check(object, { 'path': (obj) => obj.distance === 2 });

  sleep(1);
};