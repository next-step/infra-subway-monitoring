# Smoke Test

![image](https://user-images.githubusercontent.com/10750614/160226766-3f3db3d2-ef55-4850-a8d3-a78492133f63.png)

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

const BASE_URL = 'https://jdragon.r-e.kr/paths/?source=1&target=2';

export default function ()  {
    http.get(`${BASE_URL}`);
    sleep(1);
};

```


# Load Test

![image](https://user-images.githubusercontent.com/10750614/160226845-6af55163-2a63-4fa8-bc96-bd2e8850ae91.png)

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
    http.get('https://jdragon.r-e.kr/paths/?source=1&target=2');
    sleep(1)
}

```

# Stress Test

![image](https://user-images.githubusercontent.com/10750614/160226966-c5477922-d883-4e5b-bfdd-7b0ef99b9d9c.png)

```javascript

import http from 'k6/http';
import { sleep } from 'k6';

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
        { duration: '50s', target: 0 }, // scale down. Recovery stage
    ],
    thresholds: {
        http_req_duration: ['p(99)<150'], // 99% of requests must complete below 0.15s
        'logged in successfully': ['p(99)<150'], // 99% of requests must complete below 0.15s
    },
};

const BASE_URL = 'https://jdragon.r-e.kr/paths/?source=1&target=2';

export default function ()  {

    http.get(`${BASE_URL}`);

    sleep(1);
};


```

![image](https://user-images.githubusercontent.com/10750614/160227078-9d905d6d-4bbc-4e57-9b55-9987638d3c3d.png)

```javascript
        { duration: '10s', target: 100 }, // below normal load
        { duration: '30s', target: 100 },
        { duration: '10s', target: 170 }, // normal load
        { duration: '30s', target: 170 },
        { duration: '10s', target: 240 }, // around the breaking point
        { duration: '30s', target: 240 },
        { duration: '10s', target: 310 }, // beyond the breaking point
        { duration: '30s', target: 310 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```

![image](https://user-images.githubusercontent.com/10750614/160227195-eb65cf1c-3e6e-43a4-9462-374caf308fc2.png)

```javascript
        { duration: '10s', target: 100 }, // below normal load
        { duration: '30s', target: 100 },
        { duration: '10s', target: 160 }, // normal load
        { duration: '30s', target: 160 },
        { duration: '10s', target: 230 }, // around the breaking point
        { duration: '30s', target: 230 },
        { duration: '10s', target: 290 }, // beyond the breaking point
        { duration: '30s', target: 290 },
        { duration: '50s', target: 0 }, // scale down. Recovery stage
```

