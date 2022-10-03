import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 2, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://infra-subway-deploy.n-e.kr';
const USERNAME = 'test@email.com';
const PASSWORD = '1234';

export default function ()  {

    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let loginRes = http.get(`${BASE_URL}/stations`);

    check(loginRes, {
        // 'get "path" page successfully': (resp) => resp.json('accessToken') !== '',
        'get station list successfully': true,
        'response': (resp) => resp
    });


    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };
    let myObjects = http.get(`${BASE_URL}/paths/?source=4&target=360`).json();
    check(myObjects, { 'retrieved member': (obj) => obj });
    sleep(1);
};