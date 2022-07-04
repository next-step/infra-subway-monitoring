import http from 'k6/http';
import { check, sleep } from 'k6';

const USERNAME = 'test@test.com';
const PASSWORD = '1234';
const BASE_URL = 'http://localhost:8080';

export const options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<500']
    }
};

export default function ()  {
    let authToken = login();
    favoritePage(authToken);
}

function login() {
    const payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const loginResponse = http.post(`${BASE_URL}/login/token`, payload, params);

    check(loginResponse, {'logged in successfully': (resp) => resp.json('accessToken') !== ''});

    const authToken = loginResponse.json('accessToken');
    const authHeaders = {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    };
    const myInfoResponse = http.get(`${BASE_URL}/members/me`, authHeaders).json();
    check(myInfoResponse, { 'retrieved member': (obj) => obj.id !== 0 });
    sleep(1);

    return authToken;
}

function favoritePage(authToken) {
    const params = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
    };

    const favoritePageResponse = http.get(`${BASE_URL}/favorites`, params);
    check(favoritePageResponse, {'moved to favorite page successfully': (resp) => resp.status === 200});
    sleep(1);
}