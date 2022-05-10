/**
 * 테스트 목적 = 서버가 어느정도 부하까지 견디는지 확인한다.
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://devrunner21.kro.kr/';
const USERNAME = 'devrunner21@gmail.com';
const PASSWORD = '1234';

export let options = {
    stages: [
        { duration: '5m', target: 100 }, // 부하를 서서히 늘림
        { duration: '5m', target: 200 },
        { duration: '5m', target: 300 },
        { duration: '5m', target: 400 },
        { duration: '5m', target: 500 },
        { duration: '5m', target: 600 },
        { duration: '5m', target: 700 },
        { duration: '5m', target: 800 },
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
