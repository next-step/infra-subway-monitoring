import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
    stages: [
        {duration: '5s', target: 50},
        {duration: '5s', target: 100},
        {duration: '5s', target: 150},
        {duration: '5s', target: 250},
        {duration: '5s', target: 300},
        {duration: '5s', target: 250},
        {duration: '5s', target: 150},
        {duration: '5s', target: 50},
        {duration: '5s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'],
    },
};

const BASE_URL = 'http://junhong-kim-alb-1211287518.ap-northeast-2.elb.amazonaws.com';
const USERNAME = 'test@test.com';
const PASSWORD = '1234';
const AGE = '20';

export default function () {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginResponse = http.post(`${BASE_URL}/login/token`
        , JSON.stringify({email: USERNAME, password: PASSWORD})
        , params);

    check(loginResponse, {
        'login': response => response.status === 200
    });

    const authHeaders = {
        headers: {
            Authorization: `Bearer ${loginResponse.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };

    const updateMemberResponse = http.put(`${BASE_URL}/members/me`
        , JSON.stringify({email: USERNAME, password: PASSWORD, age: AGE})
        , authHeaders);

    check(updateMemberResponse, {
        'update_member': response => response.status === 200
    });

    sleep(1);
};
