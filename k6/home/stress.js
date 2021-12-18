import http from 'k6/http';
import {check, sleep} from 'k6';

const vUserOnAverageTraffic = (23 * ((2 * 0.5) + 1)) / 2; // 23
const vUserOnMaxTraffic = (46 * ((2 * 0.5) + 1)) / 2; // 46

export let options = {
    stages: [
        {duration: '10s', target: 23},
        {duration: '10s', target: 23},
        {duration: '10s', target: 46},
        {duration: '10s', target: 46},
        {duration: '10s', target: 500},
        {duration: '10s', target: 500},
        {duration: '10s', target: 1000},
        {duration: '10s', target: 1000},
        {duration: '10s', target: 1500},
        {duration: '10s', target: 1500},
        {duration: '10s', target: 2000},
        {duration: '10s', target: 2000},
        {duration: '10s', target: 2500},
        {duration: '10s', target: 2500},
        {duration: '10s', target: 0},
    ],

    thresholds: {
        http_req_duration: ['p(99)<100']
    },
};

const BASE_URL = 'http://y2o2u2n-alb-1093980542.ap-northeast-2.elb.amazonaws.com';
const USERNAME = 'username@gmail.com';
const PASSWORD = 'password';

export default function () {
    const loginRes = http.post(`${BASE_URL}/login/token`,
        JSON.stringify({email: USERNAME, password: PASSWORD}),
        {headers: {'Content-Type': 'application/json'}});
    check(loginRes, {'logged in': (r) => r.json('accessToken') !== ''});

    const getMembersMeRes = http.get(`${BASE_URL}/members/me`,
        {headers: {Authorization: `Bearer ${loginRes.json('accessToken')}`}});
    check(getMembersMeRes.json(), {'got profile': (obj) => obj.id !== 0});

    sleep(1);
};
