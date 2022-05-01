import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<2000'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://dibtp1221.kro.kr/';
const USERNAME = 'dibtp1221@gmail.com';
const PASSWORD = '1221';

export default function ()  {

    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params).json();
    console.log(loginRes.accessToken);

    check(loginRes, {
        'logged in successfully': (resp) => resp.accessToken !== undefined,
    });


    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.accessToken}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();

    console.log(myObjects.id);
    check(myObjects, { 'retrieved member': (obj) => obj.id === 1 });

    let pathObject = http.get(`${BASE_URL}/paths?source=24&target=12`).json();
    console.log(pathObject.distance);
    check(pathObject, {'correct path': (obj) => obj.distance === 25 });
    sleep(1);
};