/**
 * 테스트 목적 = 테스트 시나리오가 정상 작동하는지 체크한다.
 */
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // smoke 테스트 이기 떄문에 1명만 세팅하고 시나리오의 정합성만 검증한다.
    duration: '10s', // 10초 동한 1명의 VUser를 유지한다.

    thresholds: {
        http_req_duration: ['p(99)<200'], // 왕복 200ms(latency를 100ms 로 세팅)
    },
};

const BASE_URL = 'https://devrunner21.kro.kr/';
const USERNAME = 'devrunner21@gmail.com';
const PASSWORD = '1234';

export default function () {

    // 로그인 요청
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

    // 로그인 사용자 정보 조회
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});

    sleep(1);

};
