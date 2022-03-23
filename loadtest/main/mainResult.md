# Smoke Test
## Smoke Test Script

```javascript

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://jdragon.r-e.kr/';

export default function ()  {

    http.get(`${BASE_URL}`);

    sleep(1);
};


```

## Smoke Test Result

![image](https://user-images.githubusercontent.com/10750614/159528384-8ffc6548-7b93-492c-a430-f174a624f532.png)



# Load Test
참고: https://k6.io/docs/test-types/load-testing/

## Load Test Script

```javascript

import http from 'k6/http';
import { sleep, check } from 'k6';

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
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

export default function () {
    const before = new Date().getTime();
    const T = 2;

    http.get('https://jdragon.r-e.kr/');

    const after = new Date().getTime();
    const diff = (after - before) / 1000;
    const remainder = T - diff;
    check(remainder, { 'reached request rate': remainder > 0 });
    if (remainder > 0) {
        sleep(remainder);
    } else {
        console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
    }
}

```

## Load Test Result

![image](https://user-images.githubusercontent.com/10750614/159541778-b46d415c-c6b6-4eab-bd02-cbc3628288c8.png)
![image](https://user-images.githubusercontent.com/10750614/159611160-5af9e264-3490-4cb8-bea7-41e7e4cbaad8.png)


# Stress Test
참고 : https://k6.io/docs/test-types/stress-testing/

## Stress Test 1

부하 발생

![image](https://user-images.githubusercontent.com/10750614/159631381-b4ba2aac-f3d0-4bac-9256-110ff84de338.png)

```javascript

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 200 }, // below normal load
        { duration: '30s', target: 200 },
        { duration: '10s', target: 600 }, // normal load
        { duration: '30s', target: 600 },
        { duration: '10s', target: 800 }, // around the breaking point
        { duration: '30s', target: 800 },
        { duration: '10s', target: 1400 }, // beyond the breaking point
        { duration: '30s', target: 1400 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
        'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://jdragon.r-e.kr/';

export default function ()  {

    http.get(`${BASE_URL}`);

    sleep(1);
};

```

## Stress Test 2

부하 발생

![image](https://user-images.githubusercontent.com/10750614/159632456-62b1d963-b708-4576-ac75-1b3497c7e6a0.png)

```javascript
        { duration: '10s', target: 200 }, // below normal load
        { duration: '30s', target: 200 },
        { duration: '10s', target: 500 }, // normal load
        { duration: '30s', target: 500 },
        { duration: '10s', target: 700 }, // around the breaking point
        { duration: '30s', target: 700 },
        { duration: '10s', target: 1000 }, // beyond the breaking point
        { duration: '30s', target: 1000 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```

## Stress Test 3

부하 발생

![image](https://user-images.githubusercontent.com/10750614/159634067-efa42067-675e-4d80-b22f-56fe7c0fd48f.png)

```javascript
        { duration: '10s', target: 200 }, // below normal load
        { duration: '30s', target: 200 },
        { duration: '10s', target: 500 }, // normal load
        { duration: '30s', target: 500 },
        { duration: '10s', target: 700 }, // around the breaking point
        { duration: '30s', target: 700 },
        { duration: '10s', target: 900 }, // beyond the breaking point
        { duration: '30s', target: 900 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```


## Stress Test 4

부하 발생하지 않음

![image](https://user-images.githubusercontent.com/10750614/159634556-50e73ad6-518f-4004-82d1-22dadf42daf4.png)

```javascript
        { duration: '10s', target: 200 }, // below normal load
        { duration: '30s', target: 200 },
        { duration: '10s', target: 500 }, // normal load
        { duration: '30s', target: 500 },
        { duration: '10s', target: 700 }, // around the breaking point
        { duration: '30s', target: 700 },
        { duration: '10s', target: 800 }, // beyond the breaking point
        { duration: '30s', target: 800 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```
