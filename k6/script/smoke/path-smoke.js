import http from 'k6/http';
import {check, sleep} from 'k6';
import {BASE_URL} from '../service-info.js';

export let options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

export default function () {
    let params = {headers: {'Content-Type': 'application/json'}};

    // 경로 조회 (용산 -> 신도림)
    let res = http.get(`${BASE_URL}/paths/?source=3&target=7`, params).json();
    check(res, {
        'path stations size is equal': (r) => r.stations.length === 6,
        'path distance is equal': (r) => r.distance === 5
    });

    sleep(1);
}
