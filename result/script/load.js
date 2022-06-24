import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 1 },
    { duration: '3m', target: 7 },
    { duration: '7m', target: 20 },
    { duration: '10m', target: 33 },
    { duration: '7m', target: 20 },
    { duration: '3m', target: 7 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1000'],
  },
};

const BASE_URL = 'https://www.su-hub9.kro.kr';
const USERNAME = 'su9581@gmail.com';
const PASSWORD = 'password';

export default function ()  {
    // 메인 페이지
    mainPage();

    // 로그인
    login();

    // 경로 검색
    findPath();

    // 즐겨찾기 등록
    createFavorite();

    // 즐겨찾기 조회
    findFavorites();

    sleep(1);
};

function mainPage() {
    let mainPageRes = http.get(`${BASE_URL}`);
    check(mainPageRes, {
        'main in successfully': (resp) => resp.status == 200,
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
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes.json('accessToken');
}

function findPath() {
    let findPathRes = http.get(`${BASE_URL}/paths?source=1&target=10`);
    check(findPathRes, {
        'find path in successfully': (resp) => resp.status == 200,
    });
}

function createFavorite() {
    var payload = JSON.stringify({
      source: 1,
      target: 10,
    });

    var accessToken = login();
    var authHeaders = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    let createFavoriteRes = http.post(`${BASE_URL}/favorites`, payload, authHeaders);
    check(createFavoriteRes, {
        'create favorite in successfully': (resp) => resp.status == 201,
    });
}

function findFavorites() {
    var accessToken = login();
    var authHeaders = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    let findFavoritesRes = http.get(`${BASE_URL}/favorites`, authHeaders);
    check(findFavoritesRes, {
        'find favorites in successfully': (resp) => resp.status == 200,
    });
}
