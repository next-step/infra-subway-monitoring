import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

const BASE_URL = 'https://mand2-infra-subway.kro.kr';
const USERNAME = 'test1@test.com';
const PASSWORD = '1234';

export const loginPathSearch = () => {
    // 로그인 + 경로검색 시나리오로 작성.
    const token = login()
    searchPath(240, 250, token)
};

const login = () => {
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

const searchPath = (from, to, token) => {
    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };
    const url = `${BASE_URL}/path/?source=${from}&target=${to}`;
    const response = http.get(url, params)
    check(response, {
        'search path in successfully': (response) => response.status === 200
    });

    sleep(1);
}
