/**
 * 경로 검색에 대한 smoke test
 */
import {URL} from 'https://jslib.k6.io/url/1.0.0/index.js';
import http from 'k6/http';
import {check, sleep} from 'k6';
import {login, generateAuthorizationHeaderWith} from '../login.js';
import {Rate} from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '5s',

  thresholds: {
    checks: ['rate>0.99'], // the rate of successful checks should be higher than 99%
    http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1s,
  },
};

const BASE_URL = 'https://writer0713.o-r.kr';

export default function () {
  getAllStations();
  getPath();
  addToFavorite();
}

/**
 * 역정보 모두 가져오기
 */
function getAllStations() {
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let stationsRes = http.get(`${BASE_URL}/stations`, params);

  const success = check(stationsRes, {
    'Successfully Got Stations JSON': (resp) => resp.json().length >= 615,
  });
  errorRate.add(!success);
  sleep(1);
}

function getPath() {
  var headers = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = new URL(`${BASE_URL}/paths`);
  url.searchParams.append('source', 1);
  url.searchParams.append('target', 15);

  const response = http.get(url.toString(), headers);

  const success = check(response, {
    'Successfully Got Path': (resp) => resp.json().distance === 27,
  });
  errorRate.add(!success);
  sleep(1);
}

function addToFavorite() {
  const auth_header = generateAuthorizationHeaderWith(login());

  var payload = JSON.stringify({
    source: 1,
    target: 15,
  });

  const url = new URL(`${BASE_URL}/favorites`);
  const response = http.post(url.toString(), payload, auth_header);

  const success = check(response, {
    'Successfully Add To Favorites': (res) => res.status === 201,
  });
  errorRate.add(!success);
  sleep(1);
}
