import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 3 },
    { duration: '2m', target: 8 },
    { duration: '3m', target: 12 },
    { duration: '2m', target: 8 },
    { duration: '1m', target: 3 },
  ],
  thresholds: {
    http_req_duration: ['p(99) < 1500'],
  },
};

const BASE_URL = 'https://las139-subway.kro.kr';
const USERNAME = 'las139@naver.com';
const PASSWORD = '1234';

export default function ()  {
    goToMainPage();

    let accessToken = login();

    findPath(accessToken);

    getFavorites(accessToken);

    sleep(1);
};

function goToMainPage() {
    let mainPageRes = http.get(`${BASE_URL}`);
    check(mainPageRes, {
        'goToMainPage success': (resp) => resp.status == 200,
    });
}

function login() {
    var payload = JSON.stringify({
      email: USERNAME,
      password: PASSWORD,
    });

    var params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    check(loginRes, {
        'login success': (resp) => resp.json('accessToken') !== '',
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
    'getFavorites success': (obj) => obj.id != 0
  });
}

function findPath(accessToken) {
  let header = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    }
  };
  let response = http.get(`${BASE_URL}/path?source=1&target=2`, header);

  check(response, {
    'findPath success' : (res) => res.status === 200
  });
}
