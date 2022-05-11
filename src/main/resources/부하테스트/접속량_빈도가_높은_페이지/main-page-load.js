/**
 * 테스트 목적 = 평균 VUser ~ 최대 VUser (피크 타임의 10배)까지 부하를 늘리면서 서버 상태를 체크한다.
 */
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

const BASE_URL = 'https://devrunner21.kro.kr/';

const USERNAME = 'devrunner21@gmail.com';
const PASSWORD = '1234';
const AVG_VUSER = 2;
const MAX_VUSER = 22;

export let options = {
    stages: [
        { duration: '5m', target: AVG_VUSER }, // 5분 동안 평균 VUser로 늘어난다.
        { duration: '5m', target: AVG_VUSER }, // 5분 동안 평균 VUser를 유지한다.
        { duration: '10m', target: MAX_VUSER }, // 10분동안 서서히 MAX VUSer수로 늘린다.
        { duration: '10m', target: MAX_VUSER }, // 10분동안 MAX VUSer를 유지한다.
        { duration: '10m', target: 0 }, // 10분동안 서서히 0으로 줄어든다.
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
