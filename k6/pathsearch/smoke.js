import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1500'],
  },
};

const BASE_URL = 'https://wooobo.r-e.kr';
const LOGIN_PAGE = BASE_URL + '/login';
const LOGIN_POST = BASE_URL + '/login/token';
const PATH_PAGE = BASE_URL + '/path';
const PATH_SEARCH = BASE_URL + '/paths';
const FAVORITE = BASE_URL + '/favorites';
const USERNAME = "test20@email.com";
const PASSWORD = "11";

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
  check(로그인_요청_응답, {
    '로그인_요청_응답 load success': (response) => response.json("accessToken") !== ""
  });

  let 경로검색_페이지_응답 = http.get(PATH_PAGE);
  check(경로검색_페이지_응답, {
    '경로검색_페이지_응답 load success': (response) => response.json("accessToken")
        !== ""
  });

  let 경로_검색_응답 = 경로검색요청(로그인_요청_응답.json("accessToken"), 1, 6);
  check(경로_검색_응답, {
    '경로_검색_응답 load success': (response) => response.json("accessToken") !== ""
  });

  let 경로_좋아요_응답 = 경로좋아요요청(로그인_요청_응답.json("accessToken"), 1, 6);
  check(경로_좋아요_응답, {
    '경로_좋아요_응답 load success': (response) => response.json("accessToken") !== ""
  });

  sleep(1);
};

function 로그인_요청() {
  return http.post(LOGIN_POST, LOGIN_PARAMS, HEADERS);
}

function 경로검색요청(token, source, target) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return http.get(
      `${PATH_SEARCH}/?source=` + source + `&target=` + target,
      authHeaders
  )
}

function 경로좋아요요청(token, source, target) {
  let authHeaders = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return http.post(
      `${FAVORITE}/?source=` + source + `&target=` + target,
      authHeaders
  )
}
