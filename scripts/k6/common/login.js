import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

const BASE_URL = 'https://mand2-infra-subway.kro.kr';
const USERNAME = 'test1@test.com';
const PASSWORD = '1234';

export const login = () => {
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

    // login 확인
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });

    sleep(1);
    return loginRes.json('accessToken');
}
