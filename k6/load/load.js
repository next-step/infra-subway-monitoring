import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
  stages: [
    {duration: '1m', target: 3},
    {duration: '5m', target: 6},
    {duration: '5m', target: 9},
    {duration: '5m', target: 15},
    {duration: '5m', target: 9},
    {duration: '5m', target: 6},
    {duration: '1m', target: 2}
  ], thresholds: {
    http_req_duration: ['p(99)<100'],
  }
};

const BASE_URL = 'https://bingbingpa.p-e.kr';

function main() {
  let mainPageRes = http.get(`${BASE_URL}/`);
  check(mainPageRes, {
    'success main page': (res) => res.status === 200,
  });
}

function path() {
  let pathPageRes = http.get(`${BASE_URL}/path`);
  check(pathPageRes, {
    'success path page': (res) => res.status === 200,
  });
}

function findPath(authHeaders) {
  let findPathRes = http.get(`${BASE_URL}/path?source=1&target=2`, authHeaders);
  check(findPathRes, {
    'success find path': (res) => res.status === 200,
  });
}

export default function () {
  main();
  path();
  findPath();

  sleep(1);
};