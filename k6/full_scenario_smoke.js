import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'https://infra-subway-imcool.p-e.kr';
const USERNAME = 'test@test.com';
const PASSWORD = '1234';

export const options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<500'] // 99% of requests must complete below 0.5s
    }
};

export default function ()  {
    mainPage();
    let authToken = login();
    pathPage();
    searchPath();
    addFavorite(authToken);
    favoritePage(authToken);
}

export function mainPage() {
    const mainPageResponse = http.get(`${BASE_URL}`);
    check(mainPageResponse, {'moved to main page successfully': (resp) => resp.status === 200});
    sleep(1);
}

export function login() {
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

export function pathPage() {
    const pathPageResponse = http.get(`${BASE_URL}/path`);
    check(pathPageResponse, {'moved to path page successfully': (resp) => resp.status === 200});
    sleep(1);
}

export function searchPath() {
    const searchPathResponse = http.get(`${BASE_URL}/paths/?source=1&target=2`);
    check(searchPathResponse, {'searched path successfully': (resp) => resp.status === 200});
    sleep(1);
}

export function addFavorite(authToken) {
    const payload = JSON.stringify({
        source: 1,
        target: 2
    });

    const params = {
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        },
    };

    const addFavoriteResp = http.post(`${BASE_URL}/favorites`, payload, params);
    check(addFavoriteResp, {'added favorite successfully': (resp) => resp.status === 201});
    sleep(1);
}

export function favoritePage(authToken) {
    const params = {
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
    };

    const favoritePageResponse = http.get(`${BASE_URL}/favorites`, params);
    check(favoritePageResponse, {'moved to favorite page successfully': (resp) => resp.status === 200});
    sleep(1);
}
