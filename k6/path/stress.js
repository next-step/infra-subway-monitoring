import http from 'k6/http';
import {sleep, check} from 'k6';

export const options = {
    stages: [
        {duration: '30s', target: 60}, // below normal load
        {duration: '60s', target: 60},
        {duration: '30s', target: 220}, // normal load
        {duration: '60s', target: 220},
        {duration: '30s', target: 330}, // around the breaking point
        {duration: '60s', target: 330},
        {duration: '30s', target: 550}, // beyond the breaking point
        {duration: '60s', target: 550},
        {duration: '30s', target: 660}, // beyond the breaking point
        {duration: '60s', target: 660},
        {duration: '10s', target: 0}, // scale down. Recovery stage.
    ],
};

const BASE_URL = 'https://hidy.kro.kr';

export default function () {
    // 지하철 역 조회
    const stationsResponse = http.post(`${BASE_URL}/stations`);
    check(stationsResponse, {
        'retrieved stations': (res) => res.status === 200,
    });

    // 역 사이 경로 검색
    const pathResponse = http.get(`${BASE_URL}/paths/?source=1&target=3`);
    check(pathResponse, {'find path': (res) => res.status === 200});
    sleep(1);
}
