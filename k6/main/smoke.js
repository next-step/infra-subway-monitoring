import http from 'k6/http';
import {check} from 'k6';
import {BASE_URL} from '../common/common.js';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

export default function ()  {
    let 메인페이지_response = 메인페이지_접속_요청();

    메인페이지_결과_확인(메인페이지_response);
}

export function 메인페이지_접속_요청() {
    return http.get(`${BASE_URL}`);
}

export function 메인페이지_결과_확인(메인페이지_response) {
    check(메인페이지_response, {
        '메인페이지 응답 결과 ===> ': (response) => response.status === 200
    });
}