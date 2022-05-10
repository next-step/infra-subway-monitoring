/**
 * 테스트 목적 = 평균 VUser ~ 최대 VUser (피크 타임의 10배)까지 부하를 늘리면서 서버 상태를 체크한다.
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://devrunner21.kro.kr/';
const USERNAME = 'devrunner21@gmail.com';
const PASSWORD = '1234';
const AVG_VUSER = 2;
const MAX_VUSER = 17;

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
    var loginPayload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, loginPayload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            'Authorization': `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json'
        },
    };

    // 노선 목록 조회
    let getLinesBeforeRes = http.get(`${BASE_URL}/lines`, authHeaders);
    check(getLinesBeforeRes, {
        'get lines request successful': (resp) => resp.status == 200,
    });

    // 노선 수정
    const payload = {
        name: '1호선',
        color: 'red lighten-1',
        upStationId: null,
        downStationId: null,
        distance: 0
    };

    let updateLinesRes = http.put(`${BASE_URL}/lines/1`, JSON.stringify(payload), authHeaders);
    check(updateLinesRes, {
        'update lines is successful': (resp) => resp.status == 200,
    });

    // 노선 목록 조회
    let getLinesAfterRes = http.get(`${BASE_URL}/lines`, authHeaders);
    check(getLinesAfterRes, {
        'get lines request successful': (resp) => resp.status == 200,
    });

    sleep(1);

};
