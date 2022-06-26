import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99) < 2000'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'https://songsimo.kro.kr';
const USERNAME = 'songsimo@songsimo.kro.kr';
const PASSWORD = '1234';

export default function ()  {
  let accessToken = login();

  getFavorites(accessToken);

  getPath(accessToken);

  sleep(1);
};

function login() {
  let payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

  return loginRes.json('accessToken');
}

function getFavorites(accessToken) {
  let params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + accessToken
    }
  }

  let response = http.get(`${BASE_URL}/favorites`, params).json();

  check(response, {
    'get favorites successfully': (obj) => obj.id != 0
  });
}

function getPath(accessToken) {
  let header = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  };
  let response = http.get(`${BASE_URL}/path?source=1&target=2`, header);

  check(response, {'경로 검색' : (res) => res.status === 200 });
}
