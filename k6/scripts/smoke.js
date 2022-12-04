import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '1m',

    thresholds: {
        http_req_duration: ['p(99)<120'], // 99% of requests must complete below 120ms
    },
};

const BASE_URL = 'https://programmer-sjk.o-r.kr';
const CURRENT_STATION_MAX_ID = 727;

function getRandomStationId() {
    const min = 1;
    return Math.floor(Math.random() * (CURRENT_STATION_MAX_ID - min) + min);
}

export default function()  {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    check(http.get(`${BASE_URL}`, params), {
        '메인 페이지 응답 성공': (resp) => resp.status === 200,
    });

    check(http.get(`${BASE_URL}/path`, params), {
        '경로 검색 페이지 응답 성공': (resp) => resp.status === 200,
    });

    const findPathUrl = `${BASE_URL}/path?source=${getRandomStationId()}&target=${getRandomStationId()}`;
    check(http.get(findPathUrl, params), {
        '경로 검색 API 호출 성공': (resp) => resp.status === 200,
    });

    sleep(1);
};
