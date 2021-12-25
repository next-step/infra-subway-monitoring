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

    http.get(`${BASE_URL}`);

    sleep(1);
};

```

## Load Test Result

![image](https://user-images.githubusercontent.com/10750614/147363015-c5a6dba0-2bc7-4232-8dd6-530feea47baa.png)


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

    http.get(`${BASE_URL}`);

    sleep(1);
};

```

## Smoke Test Result

![image](https://user-images.githubusercontent.com/10750614/147363459-00be4428-72d1-4dd0-aa28-354ccfd5859e.png)


## Stress Test Script

```javascript
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 20 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 200 },
        { duration: '20s', target: 200 },
        { duration: '10s', target: 200 },
        { duration: '20s', target: 400 },
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

    http.get(`${BASE_URL}`);

    sleep(1);
};

```



## Stress Test Result

```javascript
        { duration: '5s', target: 20 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 200 },
        { duration: '20s', target: 200 },
        { duration: '10s', target: 200 },
        { duration: '20s', target: 400 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 0 },
```
![image](https://user-images.githubusercontent.com/10750614/147363723-1eeb1a16-fe8d-4c63-953d-f912659e1fc0.png)


```javascript
        { duration: '5s', target: 100 },
        { duration: '10s', target: 500 },
        { duration: '10s', target: 1000 },
        { duration: '20s', target: 1000 },
        { duration: '10s', target: 1000 },
        { duration: '20s', target: 2000 },
        { duration: '10s', target: 1000 },
        { duration: '10s', target: 500 },
        { duration: '10s', target: 0 }
```
![image](https://user-images.githubusercontent.com/10750614/147363907-f1ad7a23-8f86-496f-a170-d359249cf018.png)


```javascript
        { duration: '5s', target: 100 },
        { duration: '10s', target: 300 },
        { duration: '10s', target: 600 },
        { duration: '20s', target: 600 },
        { duration: '10s', target: 600 },
        { duration: '20s', target: 1200 },
        { duration: '10s', target: 600 },
        { duration: '10s', target: 200 },
        { duration: '10s', target: 0 }
```
![image](https://user-images.githubusercontent.com/10750614/147364165-ab2e7f49-ac78-4248-b6da-d881574f32a4.png)

```javascript
        { duration: '5s', target: 100 },
        { duration: '10s', target: 280 },
        { duration: '10s', target: 560 },
        { duration: '20s', target: 560 },
        { duration: '10s', target: 560 },
        { duration: '20s', target: 1120 },
        { duration: '10s', target: 560 },
        { duration: '10s', target: 180 },
        { duration: '10s', target: 0 },
```

![image](https://user-images.githubusercontent.com/10750614/147364302-7e167623-cfcf-4805-9e16-34f8a9b33b13.png)

```javascript
        { duration: '5s', target: 100 },
        { duration: '10s', target: 260 },
        { duration: '10s', target: 520 },
        { duration: '20s', target: 520 },
        { duration: '10s', target: 520 },
        { duration: '20s', target: 1040 },
        { duration: '10s', target: 520 },
        { duration: '10s', target: 170 },
        { duration: '10s', target: 0 },
```

![image](https://user-images.githubusercontent.com/10750614/147364411-5ded1619-30b4-42dd-b56e-bc17ac3452dc.png)


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
![image](https://user-images.githubusercontent.com/10750614/147364547-1c7383f2-fb7f-4444-9bd8-66ed6ad1ef3f.png)
