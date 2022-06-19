import http from 'k6/http';
import { check, fail, sleep } from 'k6';

const BASE_URL = 'https://sung-jin.p-e.kr';
const USERNAME = 'monitoring@monitor.com';
const PASSWORD = '1234';

const payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
});
const params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const request = (method) => {
    switch (method) {
        case 'get': return http.get;
        case 'post': return http.post;
        case 'put': return http.put;
        case 'delete': return http.delete;
        default: fail('허용하지 않는 메소드입니다.');
    }
}

export default function(method, targetPath, checkBy) {
    const token = http.post(`${BASE_URL}/login/token`, payload, params).json('accessToken');

    if (!token) {
        fail('로그인을 할 수 없습니다.');
    }

    const headers = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = request(method)(`${BASE_URL}${targetPath}`, headers);

    check(response, checkBy);
    sleep(1);
}