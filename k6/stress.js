import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 750,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://minseoklim.p-e.kr';
const USERNAME = 'test@test.com';
const PASSWORD = 'password';

export default function () {
    const before = new Date().getTime();
    const T = 6 * 1.5;

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // 로그인
    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    // 내 정보 조회
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, {'retrieved member': (obj) => obj.id != 0});

    // 지하철역 목록 조회
    let stations = http.get(`${BASE_URL}/stations`).json();
    check(stations, {'retrieved stations': (obj) => obj != null});

    // 경로 검색
    let paths = http.get(`${BASE_URL}/paths/?source=1&target=2`).json();
    check(paths, {'retrieved paths': (obj) => obj != null});

    // 지하철역 저장
    let stationPayload = JSON.stringify({
        name: 'Station' + new Date().getTime()
    });
    let stationRes = http.post(`${BASE_URL}/stations`, stationPayload, params);
    check(stationRes, {'station saved': (obj) => obj != null});

    // 노선 저장
    let linePayload = JSON.stringify({
        name: 'Line' + new Date().getTime(),
        color: "red lighten-1",
        upStationId: 1,
        downStationId: 2,
        distance: 1
    });
    let lineRes = http.post(`${BASE_URL}/lines`, linePayload, params);
    check(lineRes, {'line saved': (obj) => obj != null});

    const after = new Date().getTime();
    const diff = (after - before) / 1000;
    const remainder = T - diff;
    check(remainder, {'reached request rate': remainder > 0});
    if (remainder > 0) {
        sleep(remainder);
    } else {
        console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
    }
};
