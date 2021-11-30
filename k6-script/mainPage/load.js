import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../config/TestInfo.js';

export let options = {
  stages: [
    { duration: '10s', target: 1 },
    { duration: '10s', target: 9 },
    { duration: '20s', target: 33 },
    { duration: '10s', target: 9 },
    { duration: '10s', target: 0 }
  ],

  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);
};

export function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}