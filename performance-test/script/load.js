import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '3m', target: 25 },
    { duration: '10m',target: 25 },
    { duration: '3m', target: 128 },
    { duration: '30m',target: 128 },
    { duration: '3m', target: 0 },
  ],

  thresholds: { // when to regard this test as success
    http_req_duration: ['p(95)<138'], // success if 95% request complete in 138ms
  },
};

const BASE_URL = 'https://www.subway-sgo8308.o-r.kr';
const STATION_COUNT = 16;

function getRandomStationId(){
  return Math.floor(Math.random() * STATION_COUNT) + 1;
}

function getPath(){
  let pathRes = http.get(`${BASE_URL}/path`);

  check(pathRes, {
    'success to get path': (res) => res.status === 200,
  });
}

function getPathResults(){
  var url = new URL(`${BASE_URL}/paths`);
  var sourceId = getRandomStationId();
  var targetId = getRandomStationId();
  url.searchParams.append('source', sourceId);
  url.searchParams.append('target', targetId);

  let pathResultRes = http.get(url.toString()).json();
  check(pathResultRes, {
    'success to get path results': (res) => "stations" in res
  });
}

export default function ()  {
  getPath();
  getPathResults();
};