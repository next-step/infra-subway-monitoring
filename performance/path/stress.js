import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 105,
    duration: '30m',
};


const BASE_URL = 'https://lights93.o-r.kr';
const USERNAME = 'test@test.com';
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


    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });


    let headers = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    };

    http.get(`${BASE_URL}/path`, headers);
    let result = http.get(`${BASE_URL}/paths/?source=207&target=103`, headers);

    check(result, {
        'is status 200': (r) => r.status === 200,
    });
    sleep(1);
};
