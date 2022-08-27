import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

const USERNAME = 'writer0713@naver.com';
const PASSWORD = 'aaaa';

export function generateAuthorizationHeaderWith(accessToken) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };
  return authHeaders;
}

/**
 * login을 진행
 * @returns accessToken
 */
export function login() {
  var payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
  const authToken = loginRes.json('accessToken');

  check(loginRes, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

  return authToken;
}
