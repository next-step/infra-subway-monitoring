# Smoke Test

![image](https://user-images.githubusercontent.com/10750614/160056749-516ae2a9-1100-4df6-98f2-a4671ffadc17.png)

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 0.15s
    },
};

const BASE_URL = 'https://jdragon.r-e.kr/';

export default function ()  {
    http.get(`${BASE_URL}`);
    sleep(1);
};

```

# Load Test

![image](https://user-images.githubusercontent.com/10750614/160057409-6baa8499-db5c-49b2-8232-fe73e08090b6.png)

```javascript
import http from 'k6/http';
import { sleep, check } from 'k6';

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

export default function () {
    http.get('https://jdragon.r-e.kr/');
    sleep(1);
}

```


# Stress Test

![image](https://user-images.githubusercontent.com/10750614/160058081-b6cfa7c5-c2a4-4009-a31c-d31ce6557883.png)

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
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 0.15s
        'logged in successfully': ['p(99)<150'], // 99% of requests must complete below 0.15s
    },
};

const BASE_URL = 'https://jdragon.r-e.kr/';

export default function ()  {

    http.get(`${BASE_URL}`);

    sleep(1);
};

```

![image](https://user-images.githubusercontent.com/10750614/160058584-d439816a-d371-4251-ba76-0a6d2d42e568.png)

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

