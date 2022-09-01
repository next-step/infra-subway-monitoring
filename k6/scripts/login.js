import http from 'k6/http';
import { check, sleep } from 'k6';

const USERNAME = 'test@gmail.com';
const PASSWORD = 'test12!#';

export function generateAuthorizationHeaderWith(accessToken) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };
    sleep(1);
    return authHeaders;
}
export function login() {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    const authToken = loginRes.json('accessToken');
    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    });
    sleep(1);
    return authToken;
}
