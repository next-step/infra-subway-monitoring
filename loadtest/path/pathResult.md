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
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'http://15.164.72.205:8080/';

export default function ()  {

    http.get(`${BASE_URL}/path`);

    sleep(1);
};
```

## Load Test Result

![image](https://user-images.githubusercontent.com/10750614/147364736-85632c85-6756-49eb-bcf3-41566083b3cb.png)


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

const BASE_URL = 'http://15.164.72.205:8080/';

export default function ()  {

    http.get(`${BASE_URL}/path`);

    sleep(1);
};

```

## Smoke Test Result

![image](https://user-images.githubusercontent.com/10750614/147364768-795cef0b-708f-4ddd-909e-e49b64551851.png)


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

const BASE_URL = 'http://15.164.72.205:8080/';

export default function ()  {

    http.get(`${BASE_URL}/path`);

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
![image](https://user-images.githubusercontent.com/10750614/147364992-9be05409-b5e4-4fe4-ac45-500b1d3b7372.png)


```javascript
        { duration: '5s', target: 100 },
        { duration: '10s', target: 270 },
        { duration: '10s', target: 540 },
        { duration: '20s', target: 540 },
        { duration: '10s', target: 540 },
        { duration: '20s', target: 1080 },
        { duration: '10s', target: 540 },
        { duration: '10s', target: 270 },
        { duration: '10s', target: 0 },
```

![image](https://user-images.githubusercontent.com/10750614/147365134-922f8f2b-e419-4146-93e0-05b3730bb24a.png)
