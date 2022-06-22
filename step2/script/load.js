import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 45 },
        { duration: '1m', target: 90 },
        { duration: '3m', target: 100 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<2400'],
    },
};

const BASE_URL = 'https://breezeunn.p-e.kr';
const USERNAME = 'test@myemail.com';
const PASSWORD = 'testpassword';

export default function ()  {

    fn_checkMainPage();

    fn_checkLoginPage();

    fn_checkLoginAndMember();

    fn_checkSectionPage();

    fn_checkSection();

    sleep(1);
};

function fn_checkMainPage() {
    let mainPageRes = http.get(`${BASE_URL}`);
    check(mainPageRes, {
        'main page response code was 200': (res) => res.status == 200,
    });
}

function fn_checkLoginPage() {
    let loginPageRes = http.get(`${BASE_URL}/login`);
    check(loginPageRes, {
        'login page response code was 200': (res) => res.status == 200,
    });
}


function fn_checkLoginAndMember() {
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
}


function fn_checkSectionPage() {
    let sectionPageRes = http.get(`${BASE_URL}/path`);
    check(sectionPageRes, {
        'Section page response code was 200': (res) => res.status == 200,
    });
}

function fn_checkSection() {
    let sections = http.get(`${BASE_URL}/paths?source=1&target=3`);
    check(sections, { 'retrived section': (res) => res.status == 200 });
}

