import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
          http_req_duration: ['p(99)<100'],
        },
};

const BASE_URL = 'https://ch3224bin.n-e.kr';
const USERNAME = 'user@ch3224bin.n-e.kr';
const PASSWORD = '1234';

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


    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
          'logged in successfully': (resp) => resp.json('accessToken') !== '',
        });


    let authHeaders = {
          headers: {
                  Authorization: `Bearer ${loginRes.json('accessToken')}`,
                },
        };
    let source = 1;
    let target = 5;
    let pathResponse = http.get(`${BASE_URL}/paths/?source=${source}&target=${target}`, authHeaders);
    check(pathResponse, { 'return path': (resp) => resp.status === 200 });
    sleep(1);
};
