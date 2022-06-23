import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages : [
        { duration: '5m', target: 19},
        { duration: '5m', target: 116},
        { duration: '5m', target: 19},
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'],
    },
};

const BASE_URL = 'https://kmmin78-infra-subway.p-e.kr';
const USERNAME = 'probitanima98855@gmail.com';
const PASSWORD = '11';

const login = () => {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    return loginRes.json('accessToken');
}

const myInfo = (accessToken) => {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
}

export default function ()  {
    let accessToken = login();
    myInfo(accessToken);
    sleep(1);
};
