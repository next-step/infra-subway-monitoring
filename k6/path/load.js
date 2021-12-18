import http from 'k6/http';
import {check, sleep} from 'k6';

const vUserOnAverageTraffic = (23 * ((2 * 0.5) + 1)) / 2;
const vUserOnMaxTraffic = (46 * ((2 * 0.5) + 1)) / 2;

export let options = {
    stages: [
        {duration: '10s', target: vUserOnAverageTraffic}, // 0 ~ average traffic
        {duration: '10s', target: vUserOnAverageTraffic}, // average traffic
        {duration: '10s', target: vUserOnMaxTraffic}, // average traffic ~ max traffic
        {duration: '10s', target: vUserOnMaxTraffic}, // max traffic
        {duration: '10s', target: vUserOnAverageTraffic}, // max traffic ~ average traffic
        {duration: '10s', target: vUserOnAverageTraffic}, // average traffic
        {duration: '10s', target: 0} // average traffic ~ 0
    ],

    thresholds: {
        http_req_duration: ['p(99)<100']
    },
};

const BASE_URL = 'http://y2o2u2n-alb-1093980542.ap-northeast-2.elb.amazonaws.com';

export default function () {
    const getStationsRes = http.get(`${BASE_URL}/stations`);
    check(getStationsRes, {
        'got stations': (r) => r.status === 200,
        'stations are not empty': (r) => JSON.parse(r.body).map(s => s.id).length > 0
    });

    const findPathRes = http.get(`${BASE_URL}/paths?source=${3}&target=${7}`);
    check(findPathRes, {'found path': (r) => r.status === 200});

    sleep(1);
};
