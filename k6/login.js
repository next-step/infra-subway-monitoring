import http from 'k6/http';
import {check} from 'k6';

const BASE_URL = 'https://orgojy.ga';

export function headerWithAuthorizationAndToken(accessToken) {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };
}

export function login(email, password) {
  let payload = JSON.stringify({
    email: email,
    password: password,
  });

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
  const authToken = loginRes.json('accessToken');

  check(loginRes, {
    'Login and get token': (resp) => resp.json('accessToken') !== '',
  });

  return authToken;
}
