import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
  stages: [
    {duration: '20s', target: 50},
    {duration: '2m', target: 50},
    {duration: '20s', target: 100},
    {duration: '2m', target: 100},
    {duration: '20s', target: 200},
    {duration: '2m', target: 200},
    {duration: '20s', target: 300},
    {duration: '2m', target: 300},
    {duration: '20s', target: 400},
    {duration: '2m', target: 400},
    {duration: '1m', target: 0}
  ], thresholds: {
    http_req_duration: ['p(99)<300'],
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