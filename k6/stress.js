import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {

  stages: [
    { duration: '1m', target: 10 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '1m', target: 200 },
    { duration: '30s', target: 400 },
    { duration: '30s', target: 500 },
    { duration: '30s', target: 0 },
  ],

  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

const BASE_URL = 'https://brick0123.o-r.kr/';
const USERNAME = 'test@a.aa';
const PASSWORD = '1234';


export default function () {
  mainPage()
  searchPath()
  login()
}
function login() {
  const payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  })

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(`${BASE_URL}/login/token`, payload, params);

  check(response, {
    'logged in successfully': (resp) => resp.json('accessToken') !== '',
  });

}

function mainPage() {
  const response = http.get(BASE_URL)
  check(response, {
    'mainPage success': (resp) => resp.status === 200
  })

}

function searchPath() {
  const response =  http.get(`${BASE_URL}/paths/?source=7&target=8`)
  check(response, {
    'searchPath success': (resp) => resp.status === 200
  })
}
