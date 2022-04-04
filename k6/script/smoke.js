import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://hk0305.n-e.kr/';
const USERNAME = 'test@test.com';
const PASSWORD = '1234';

export default function() {
    function login() {
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


        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };
        let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
        check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
        sleep(1);

        return authHeaders;
    };

    function accessStationPage(authHeaders) {
        let stationPageObjects = http.get(`${BASE_URL}/station`, authHeaders).json();
        check(stationPageObjects, { 'access Station Page': (obj) => obj.id != 0 });
        sleep(0.5);
    }

    const authHeaders = login();
    accessStationPage(authHeaders);
}
