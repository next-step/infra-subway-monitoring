import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '1s', target: 4}, // ${duration} 동안 현재 사용자를 ${target}명으로 유지한다.
        {duration: '3s', target: 5},
        {duration: '5s', target: 7},
        {duration: '6s', target: 14},
        {duration: '7s', target: 16},
        {duration: '8s', target: 24},
    ],
    thresholds: {
        http_req_duration: ['p(99)<1000'], // 99% of requests must complete below 1.0s
    },
};

const BASE_URL = 'https://90mansik.kro.kr/';

export default function ()  {
    mainPage();
    pathPage();
    findPage();

    sleep(1);
}

function mainPage(){
    const response = http.get(BASE_URL);

    check(response, {
        'success mainPage' : (res) => res.status === 200
    });
}

function pathPage(){
    const response = http.get(`${BASE_URL}/path`);

    check(response, {
        'success pathPage' : (res) => res.status === 200
    });
}

function findPage(){
    const response = http.get(`${BASE_URL}/path?source=1&target=3`);

    check(response, {
        'success findPage' : (res) => res.status === 200
    });
}
