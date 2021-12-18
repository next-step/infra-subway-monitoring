import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://y2o2u2n-alb-1093980542.ap-northeast-2.elb.amazonaws.com';
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
