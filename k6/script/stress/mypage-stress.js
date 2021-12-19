import http from 'k6/http';
import {check, sleep} from 'k6';
import {BASE_URL, EMAIL, PASSWORD} from '../service-info.js';

// Throughput (1일 평균 rps ~ 1일 최대 rps): 4 ~ 9
export const options = {
    stages: [
        {duration: '5s', target: 20},
        {duration: '5s', target: 40},
        {duration: '10s', target: 80},
        {duration: '10s', target: 100},
        {duration: '10s', target: 150},
        {duration: '10s', target: 100},
        {duration: '5s', target: 50},
        {duration: '5s', target: 0}

    ],
    thresholds: {
        http_req_duration: ['p(99)<1500']
    }
};

export default function () {
    let headers = {headers: {'Content-Type': 'application/json'}};
    let loginPayload = {email: EMAIL, password: PASSWORD};
    let loginRes = http.post(`${BASE_URL}/login/token`, JSON.stringify(loginPayload), headers);
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== ''
    });

    let authParam = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json'
        }
    };
    let updatePayload = {email: EMAIL, password: PASSWORD, age: 40};
    let updateRes = http.put(`${BASE_URL}/members/me`, JSON.stringify(updatePayload), authParam);
    check(updateRes, {
        'member age is updated': (r) =>  r.id !== 0
    });

    sleep(1);
}
