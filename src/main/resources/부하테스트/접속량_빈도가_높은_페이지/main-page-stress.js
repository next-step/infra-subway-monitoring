/**
 * 테스트 목적 = 서버가 어느정도 부하까지 견디는지 확인한다.
 */
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

const BASE_URL = 'https://devrunner21.kro.kr/';
const USERNAME = 'devrunner21@gmail.com';
const PASSWORD = '1234';

export let options = {
    stages: [
        { duration: '5m', target: 100 }, // 부하를 서서히 늘림
        { duration: '5m', target: 100 }, // 해당 부하를 유지
        { duration: '5m', target: 200 }, // 부하를 서서히 늘림
        { duration: '5m', target: 200 }, // 해당 부하를 유지
        { duration: '5m', target: 300 }, // 부하를 서서히 늘림
        { duration: '5m', target: 300 }, // 해당 부하를 유지
        { duration: '5m', target: 400 }, // 부하를 서서히 늘림
        { duration: '5m', target: 400 }, // 해당 부하를 유지
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'], // 왕복 200ms(latency를 100ms 로 세팅)
        'logged in successfully': ['p(99)<200'],
    },
};

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
