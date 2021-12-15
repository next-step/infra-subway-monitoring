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
        {duration: '10s', target: Math.floor(1.25 * vUserOnMaxTraffic)}, // max traffic ~ 1.25 * max traffic
        {duration: '10s', target: Math.floor(1.25 * vUserOnMaxTraffic)}, // 1.25 * max traffic
        {duration: '10s', target: Math.floor(1.5 * vUserOnMaxTraffic)}, // 1.25 * max traffic ~ 1.5 * max traffic
        {duration: '10s', target: Math.floor(1.5 * vUserOnMaxTraffic)}, // 1.5 * max traffic
        {duration: '10s', target: 0}, // 1.5 * max traffic ~ 0
    ],

    thresholds: {
        http_req_duration: ['p(99)<100']
    },
};

const BASE_URL = 'http://y2o2u2n-alb-1093980542.ap-northeast-2.elb.amazonaws.com/';
const USERNAME = 'username@gmail.com';
const PASSWORD = 'password';
const NEW_AGE = 1;

export default function () {
    const loginRes = http.post(`${BASE_URL}/login/token`,
        JSON.stringify({email: USERNAME, password: PASSWORD}),
        {headers: {'Content-Type': 'application/json'}});
    check(loginRes, {'logged in': (r) => r.json('accessToken') !== ''});

    const getMembersMeRes = http.get(`${BASE_URL}/members/me`,
        {headers: {'Authorization': `Bearer ${loginRes.json('accessToken')}`}});
    check(getMembersMeRes.json(), {'got profile': (obj) => obj.id !== 0});

    const updateMembersMeRes = http.put(`${BASE_URL}/members/me`,
        JSON.stringify({email: USERNAME, password: PASSWORD, age: NEW_AGE}),
        {headers: {'Authorization': `Bearer ${loginRes.json('accessToken')}`, 'Content-Type': 'application/json'}});
    check(updateMembersMeRes, {'updated profile': (r) => r.status === 200});

    const getMembersMeAgainRes = http.get(`${BASE_URL}/members/me`,
        {headers: {'Authorization': `Bearer ${loginRes.json('accessToken')}`}});
    check(getMembersMeAgainRes.json(), {
        'got profile': (obj) => obj.id !== 0,
        'changed age': (obj) => obj.age === NEW_AGE
    });

    sleep(1);
};
