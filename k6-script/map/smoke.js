import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../config/TestInfo.js';

export let options = {
  vus: 1,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<100'],
  },
};

export default function ()  {
  let 메인페이지_결과 = 메인페이지_요청();
  메인페이지_결과_확인(메인페이지_결과);

  let 경로탐색_요청_결과 = 경로탐색_요청(150, 250)
  경로탐색_결과_확인(경로탐색_요청_결과);
};

export function 메인페이지_요청() {
  return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_결과) {
  check(메인페이지_결과, {
    '메인페이지가 정상적으로 응답함': (response) => response.status === 200
  });
}

export function 경로탐색_요청(출발역, 도착역) {

  return http.get(`${BASE_URL}/paths?source=` + 출발역 + `&target=` + 도착역 );
}

export function 경로탐색_결과_확인(경로_검색_결과) {
  check(경로_검색_결과, {
    '경로가 정상적으로 검색됨': (response) => response.json('stations').length > 0
  });
}