## Load Test Script

```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '10s', target: 200 },
        { duration: '20s', target: 200 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'],
        'page loading complete': ['p(99)<1500'],
    },
};

const BASE_URL = 'http://15.164.72.205:8080';
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

## Load Test Result

![image](https://user-images.githubusercontent.com/10750614/147377442-e3130158-dd7a-4c4b-ba68-708d27a95a0f.png)

## Smoke Test Script

```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://15.164.72.205:8080';
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

## Smoke Test Result

![image](https://user-images.githubusercontent.com/10750614/147377424-79692b56-71f8-49ea-8a89-aaaa68fad159.png)

## Stress Test Script

```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
export let options = {
    stages: [
        { duration: '5s', target: 100 },
        { duration: '10s', target: 250 },
        { duration: '10s', target: 500 },
        { duration: '20s', target: 500 },
        { duration: '10s', target: 500 },
        { duration: '20s', target: 1000 },
        { duration: '10s', target: 500 },
        { duration: '10s', target: 150 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://15.164.72.205:8080';
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

## Stress Test Result

```javascript
        { duration: '5s', target: 100 },
        { duration: '10s', target: 250 },
        { duration: '10s', target: 500 },
        { duration: '20s', target: 500 },
        { duration: '10s', target: 500 },
        { duration: '20s', target: 1000 },
        { duration: '10s', target: 500 },
        { duration: '10s', target: 150 },
        { duration: '10s', target: 0 },
```

![image](https://user-images.githubusercontent.com/10750614/147377627-c3c71953-5426-4bc8-8494-51a322db8184.png)

```javascript
        { duration: '5s', target: 100 },
        { duration: '10s', target: 250 },
        { duration: '10s', target: 500 },
        { duration: '20s', target: 500 },
        { duration: '10s', target: 500 },
        { duration: '20s', target: 1000 },
        { duration: '10s', target: 500 },
        { duration: '10s', target: 150 },
        { duration: '10s', target: 0 },
```

![image](https://user-images.githubusercontent.com/10750614/147377672-4b35bed6-312c-448d-b8f4-ea559a3539f7.png)


```javascript
        { duration: '5s', target: 100 },
        { duration: '10s', target: 270 },
        { duration: '10s', target: 540 },
        { duration: '20s', target: 540 },
        { duration: '10s', target: 540 },
        { duration: '20s', target: 1080 },
        { duration: '10s', target: 540 },
        { duration: '10s', target: 150 },
        { duration: '10s', target: 0 },
```

![image](https://user-images.githubusercontent.com/10750614/147377743-4f7c96e5-07c6-416f-9287-bf6bda3c63d1.png)
