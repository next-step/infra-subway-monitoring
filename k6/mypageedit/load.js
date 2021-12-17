import http from 'k6/http';
import {check, sleep} from 'k6';

// 요청 수 : 4
// http_req_duration : 0.5
// T = (4 * 0.5) + 1 = 3
// VUser = (340 * 3) / 4 = 255
export let options = {
  stages: [
    {duration: "10s", target: 50},
    {duration: "20s", target: 100},
    {duration: "20s", target: 255},
    {duration: "10s", target: 0},
  ],

  thresholds: {
    http_req_duration: ['p(99)<1500'],
  },
};

const BASE_URL = 'https://wooobo.kro.kr';
const LOGIN_PAGE = BASE_URL + '/login';
const LOGIN_POST = BASE_URL + '/login/token';
const EDIT_PAGE = BASE_URL + '/mypage/edit';
const EDIT_PUT = BASE_URL + '/members/me';
const USERNAME = "test20@email.com";
const PASSWORD = "11";
const AGE = "30";

const HEADERS = {
  headers: {
    "Content-Type": "application/json"
  }
};

const LOGIN_PARAMS = JSON.stringify({
  email: USERNAME,
  password: PASSWORD
});

export default function () {
  let 로그인페이지_응답 = http.get(LOGIN_PAGE);
  check(로그인페이지_응답,
      {'로그인페이지_응답 load success': (response) => response.status === 200});

  let 로그인_요청_응답 = 로그인_요청();
  check(로그인_요청_응답,
      {
        '로그인_요청_응답 load success': (response) => response.json("accessToken")
            !== ""
      });

  let 수정페이지_응답 = http.get(EDIT_PAGE);
  check(수정페이지_응답,
      {'수정페이지_응답 load success': (response) => response.status === 200});

  let 내정보_수정_응답 = 내정보_수정(로그인_요청_응답.json("accessToken"));
  check(내정보_수정_응답,
      {'내정보_수정_응답 load success': (response) => response.status === 200});

  sleep(1);
};

function 로그인_요청() {
  return http.post(LOGIN_POST, LOGIN_PARAMS, HEADERS);
}

function 내정보_수정(token) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  }
  return http.put(EDIT_PUT, JSON.stringify({
    email: USERNAME,
    age: AGE,
    password: PASSWORD
  }), authHeaders);
}
