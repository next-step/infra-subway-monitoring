/**
 * 테스트 목적 = 서버가 어느정도 부하까지 견디는지 확인한다.
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://devrunner21.kro.kr/';

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

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // 노선 목록 조회
    let getLinesBeforeRes = http.get(`${BASE_URL}/lines`, params);
    check(getLinesBeforeRes, {
        'get lines request successful': (resp) => resp.status == 200,
    });

    // 노선 수정
    const payload = {id : 1, name : '1호선', color : 'red lighten-1'};
    let updateLinesRes = http.put(`${BASE_URL}/lines/1`, params, payload);
    check(updateLinesRes, {
        'update lines is successful': (resp) => resp.status == 200,
    });

    // 노선 목록 조회
    let getLinesAfterRes = http.get(`${BASE_URL}/lines`, params);
    check(getLinesAfterRes, {
        'get lines request successful': (resp) => resp.status == 200,
    });

    sleep(1);

};
