# Smoke Test

## Smoke Test Result

![image](https://user-images.githubusercontent.com/10750614/159703627-11e838e9-8a44-4dcb-b2f0-78e0329169cd.png)

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
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

## Load Test Result

![image](https://user-images.githubusercontent.com/10750614/159722046-240cc77c-0277-4295-8d66-a11bc3b13039.png)

```javascript

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 300,
    stages: [
        { duration: '10m', target: 100 },
        { duration: '20m', target: 200 },
        { duration: '10m', target: 300 },
        { duration: '20m', target: 200 },
        { duration: '10m', target: 100 },
        { duration: '10m', target: 0 },
    ],
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

## Stress Test 1

부하 발생

![image](https://user-images.githubusercontent.com/10750614/159723646-d12042e3-9f12-497b-9350-81f58b979a41.png)

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';
export let options = {
    stages: [
        { duration: '10s', target: 200 }, // below normal load
        { duration: '30s', target: 200 },
        { duration: '10s', target: 500 }, // normal load
        { duration: '30s', target: 500 },
        { duration: '10s', target: 700 }, // around the breaking point
        { duration: '30s', target: 700 },
        { duration: '10s', target: 800 }, // beyond the breaking point
        { duration: '30s', target: 800 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
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

## Stress Test 2

부하 발생하지 않음

![image](https://user-images.githubusercontent.com/10750614/159724846-4b80b610-4db9-44fa-af24-84bde1e7e403.png)

```javascript
        { duration: '10s', target: 100 }, // below normal load
        { duration: '30s', target: 100 },
        { duration: '10s', target: 200 }, // normal load
        { duration: '30s', target: 200 },
        { duration: '10s', target: 300 }, // around the breaking point
        { duration: '30s', target: 300 },
        { duration: '10s', target: 400 }, // beyond the breaking point
        { duration: '30s', target: 400 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```

## Stress Test 3

부하발생
![image](https://user-images.githubusercontent.com/10750614/159726646-d9eeeee9-ef46-44d2-a68c-1116c22d7c62.png)

```javascript
        { duration: '10s', target: 150 }, // below normal load
        { duration: '30s', target: 150 },
        { duration: '10s', target: 300 }, // normal load
        { duration: '30s', target: 300 },
        { duration: '10s', target: 450 }, // around the breaking point
        { duration: '30s', target: 450 },
        { duration: '10s', target: 600 }, // beyond the breaking point
        { duration: '30s', target: 600 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```

## Stress Test 4

부하발생
![image](https://user-images.githubusercontent.com/10750614/159728085-3bd337c0-1bdd-4037-9073-656e5ea24ba4.png)

```javascript
        { duration: '10s', target: 150 }, // below normal load
        { duration: '30s', target: 150 },
        { duration: '10s', target: 300 }, // normal load
        { duration: '30s', target: 300 },
        { duration: '10s', target: 450 }, // around the breaking point
        { duration: '30s', target: 450 },
        { duration: '10s', target: 500 }, // beyond the breaking point
        { duration: '30s', target: 500 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```
