/**
 * 테스트 목적 = 서버가 어느정도 부하까지 견디는지 확인한다.
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://devrunner21.kro.kr/';

export let options = {
    stages: [
        { duration: '5m', target: 100 }, // 부하를 서서히 늘림
        { duration: '5m', target: 200 }, // 해당 부하를 유지
        { duration: '5m', target: 300 }, // 부하를 서서히 늘림
        { duration: '5m', target: 400 }, // 해당 부하를 유지
        { duration: '5m', target: 500 }, // 부하를 서서히 늘림
        { duration: '5m', target: 600 }, // 해당 부하를 유지
        { duration: '5m', target: 700 }, // 부하를 서서히 늘림
        { duration: '5m', target: 800 }, // 해당 부하를 유지
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

    // 역 목록 조회
    let getStationsRes = http.get(`${BASE_URL}/stations`, params);
    check(getStationsRes, {
        'get stations request successful': (resp) => resp.status == 200,
    });

    // 경로 검색
    let searchPathsRes = http.get(`${BASE_URL}/paths?source=84&target=105`, params);
    check(searchPathsRes, {
        'search paths is successful': (resp) => resp.status == 200,
    });

    sleep(1);

};
