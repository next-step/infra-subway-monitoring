# Smoke Test

![image](https://user-images.githubusercontent.com/10750614/160226385-8632878e-be6e-4f3e-acb8-65f80fe6f36f.png)

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

![image](https://user-images.githubusercontent.com/10750614/160226457-a4d23e02-7864-48d2-9dd0-f613a0413a62.png)

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

![image](https://user-images.githubusercontent.com/10750614/160226577-77c72877-d1a5-4b2b-a4fc-ee5efc43772f.png)

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

![image](https://user-images.githubusercontent.com/10750614/160226707-ce94df15-9b59-4697-aba4-f604be1ed4a6.png)

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

