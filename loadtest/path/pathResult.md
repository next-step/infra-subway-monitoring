# Smoke Test
## Smoke Test Result

![image](https://user-images.githubusercontent.com/10750614/159641142-535d85ce-ca79-4aa0-a51b-cb0777ee4ddc.png)

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

const BASE_URL = 'https://jdragon.r-e.kr/paths/?source=1&target=2';

export default function ()  {

    http.get(`${BASE_URL}`);

    sleep(1);
};


```

# Load Test
## Load Test Result
T=2 일때 결과
![image](https://user-images.githubusercontent.com/10750614/159655075-3dc332de-2575-4df2-8b34-428cd03d8aea.png)

T=15 일때 결과
![image](https://user-images.githubusercontent.com/10750614/159678437-d23cf543-433d-4b17-81eb-8189c618dc18.png)

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
};

export default function () {
    const before = new Date().getTime();
    const T = 2;

    http.get('https://jdragon.r-e.kr/paths/?source=1&target=2');

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

# Stress Test

## Stress Test 1

부하 발생

![image](https://user-images.githubusercontent.com/10750614/159681034-4d6158ee-b332-4e62-857e-6931287fd318.png)

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

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

const BASE_URL = 'https://jdragon.r-e.kr/paths/?source=1&target=2';

export default function ()  {

    http.get(`${BASE_URL}`);

    sleep(1);
};

```

## Stress Test 2

부하 발생

![image](https://user-images.githubusercontent.com/10750614/159682551-276c4570-f9d6-4be2-8505-38959b90e960.png)

```javascript
        { duration: '10s', target: 100 }, // below normal load
        { duration: '30s', target: 100 },
        { duration: '10s', target: 200 }, // normal load
        { duration: '30s', target: 200 },
        { duration: '10s', target: 300 }, // around the breaking point
        { duration: '30s', target: 300 },
        { duration: '10s', target: 500 }, // beyond the breaking point
        { duration: '30s', target: 500 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```

## Stress Test 3

부하 발생하지 않음

![image](https://user-images.githubusercontent.com/10750614/159685179-8825081c-b444-40ff-93b2-183ae00ce124.png)

```javascript
        { duration: '10s', target: 30 }, // below normal load
        { duration: '30s', target: 30 },
        { duration: '10s', target: 50 }, // normal load
        { duration: '30s', target: 50 },
        { duration: '10s', target: 70 }, // around the breaking point
        { duration: '30s', target: 70 },
        { duration: '10s', target: 90 }, // beyond the breaking point
        { duration: '30s', target: 90 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```

## Stress Test 4

부하 발생하지 않음

![image](https://user-images.githubusercontent.com/10750614/159693975-b82602ae-def2-40c4-b89f-fc9a0e2a2cd3.png)

```javascript
        { duration: '10s', target: 50 }, // below normal load
        { duration: '30s', target: 50 },
        { duration: '10s', target: 70 }, // normal load
        { duration: '30s', target: 70 },
        { duration: '10s', target: 100 }, // around the breaking point
        { duration: '30s', target: 100 },
        { duration: '10s', target: 200 }, // beyond the breaking point
        { duration: '30s', target: 200 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```

## Stress Test 5

부하 발생

![image](https://user-images.githubusercontent.com/10750614/159694904-5d21a3e8-6e0f-46b1-8e7c-26cec8f4bd42.png)

```javascript
        { duration: '10s', target: 50 }, // below normal load
        { duration: '30s', target: 50 },
        { duration: '10s', target: 70 }, // normal load
        { duration: '30s', target: 70 },
        { duration: '10s', target: 100 }, // around the breaking point
        { duration: '30s', target: 100 },
        { duration: '10s', target: 300 }, // beyond the breaking point
        { duration: '30s', target: 300 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```

## Stress Test 6

부하 발생하지 않음

![image](https://user-images.githubusercontent.com/10750614/159696847-5d0c878f-793e-40e5-a6df-71359cae1699.png)

```javascript
        { duration: '10s', target: 50 }, // below normal load
        { duration: '30s', target: 50 },
        { duration: '10s', target: 70 }, // normal load
        { duration: '30s', target: 70 },
        { duration: '10s', target: 100 }, // around the breaking point
        { duration: '30s', target: 100 },
        { duration: '10s', target: 250 }, // beyond the breaking point
        { duration: '30s', target: 250 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```

## Stress Test 7

부하 발생

![image](https://user-images.githubusercontent.com/10750614/159699092-a73ec728-5e6f-4bc6-9bd8-690020cbc76f.png)

```javascript
        { duration: '10s', target: 50 }, // below normal load
        { duration: '30s', target: 50 },
        { duration: '10s', target: 70 }, // normal load
        { duration: '30s', target: 70 },
        { duration: '10s', target: 100 }, // around the breaking point
        { duration: '30s', target: 100 },
        { duration: '10s', target: 270 }, // beyond the breaking point
        { duration: '30s', target: 270 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```
