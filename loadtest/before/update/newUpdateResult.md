# Smoke Test

![image](https://user-images.githubusercontent.com/10750614/160066925-1654b6d7-23a3-492b-b072-73c19c4a2cfa.png)

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 0.15s
    },
};

const BASE_URL = 'https://jdragon.r-e.kr';
const USERNAME = 'koola976@gmail.com';
const PASSWORD = '1234';

export default function () {
    let loginRes = http.post(`${BASE_URL}/login/token`,
        JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
        })
        , {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    check(loginRes, {
        'login successfully': (resp) => resp.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };

    let updateRes = http.put(`${BASE_URL}/members/me`,
        JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
            age: 77
        }),
        authHeaders);
    check(updateRes, { 'updated member': (resp) => resp.status === 200 });

    let myObjects = http.get(`${BASE_URL}/members/me`,
        authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id === 1 });

    sleep(1);
};

```

# Load Test

![image](https://user-images.githubusercontent.com/10750614/160069859-216b0840-5df0-49b7-af23-4c653bf02ee7.png)

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 2 },
        { duration: '20s', target: 2 },
        { duration: '10s', target: 15 },
        { duration: '20s', target: 15 },
        { duration: '10s', target: 30 },
        { duration: '20s', target: 30 },
        { duration: '10s', target: 2 },
        { duration: '20s', target: 2 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 0.15s
        'logged in successfully': ['p(99)<150'], // 99% of requests must complete below 0.15s
    },
};

const BASE_URL = 'https://jdragon.r-e.kr';
const USERNAME = 'koola976@gmail.com';
const PASSWORD = '1234';

export default function () {
    let loginRes = http.post(`${BASE_URL}/login/token`,
        JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
        })
        , {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    check(loginRes, {
        'login successfully': (resp) => resp.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };

    let updateRes = http.put(`${BASE_URL}/members/me`,
        JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
            age: 77
        }),
        authHeaders);
    check(updateRes, { 'updated member': (resp) => resp.status === 200 });

    let myObjects = http.get(`${BASE_URL}/members/me`,
        authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id === 1 });

    sleep(1);
};

```


# Stress Test

![image](https://user-images.githubusercontent.com/10750614/160070630-5e9b7399-0c36-4919-abe4-33e14ff8bd4c.png)

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
    stages: [
        { duration: '10s', target: 100 }, // below normal load
        { duration: '30s', target: 100 },
        { duration: '10s', target: 200 }, // normal load
        { duration: '30s', target: 200 },
        { duration: '10s', target: 300 }, // around the breaking point
        { duration: '30s', target: 300 },
        { duration: '10s', target: 500 }, // beyond the breaking point
        { duration: '30s', target: 500 },
        { duration: '10s', target: 0 }, // scale down. Recovery stage
    ],
    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 0.15s
        'logged in successfully': ['p(99)<150'], // 99% of requests must complete below 0.15s
    },
};

const BASE_URL = 'https://jdragon.r-e.kr';
const USERNAME = 'koola976@gmail.com';
const PASSWORD = '1234';

export default function () {
    let loginRes = http.post(`${BASE_URL}/login/token`,
        JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
        })
        , {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    check(loginRes, {
        'login successfully': (resp) => resp.json('accessToken') !== '',
    });

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
            'Content-Type': 'application/json',
        },
    };

    let updateRes = http.put(`${BASE_URL}/members/me`,
        JSON.stringify({
            email: USERNAME,
            password: PASSWORD,
            age: 77
        }),
        authHeaders);
    check(updateRes, { 'updated member': (resp) => resp.status === 200 });

    let myObjects = http.get(`${BASE_URL}/members/me`,
        authHeaders).json();
    check(myObjects, { 'retrieved member': (obj) => obj.id === 1 });

    sleep(1);
};

```
