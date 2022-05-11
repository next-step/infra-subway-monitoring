/**
 * 테스트 목적 = 테스트 시나리오가 정상 작동하는지 체크한다.
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1, // smoke 테스트 이기 떄문에 1명만 세팅하고 시나리오의 정합성만 검증한다.
    duration: '10s', // 10초 동한 1명의 VUser를 유지한다.

    thresholds: {
        http_req_duration: ['p(99)<200'], // latency를 100ms 로 세팅
    },
};

const BASE_URL = 'https://devrunner21.kro.kr/';

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
