import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';
import {BASE_URL, USERNAME, PASSWORD} from '../config/TestInfo.js';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5s
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