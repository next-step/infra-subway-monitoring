# Smoke Test

![image](https://user-images.githubusercontent.com/10750614/160266969-2a3702c6-cca6-41a2-a02b-c02527b58497.png)

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

![image](https://user-images.githubusercontent.com/10750614/160266870-93550860-0572-4aee-888f-a661ec16a54d.png)

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

![image](https://user-images.githubusercontent.com/10750614/160267253-947cc479-a34c-423e-90a8-094589c361ee.png)

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

![image](https://user-images.githubusercontent.com/10750614/160267174-801897f8-79ce-4c44-a1ac-5f643d9ab0d1.png)

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

![image](https://user-images.githubusercontent.com/10750614/160267086-c4d07d38-7b54-4ac0-ac2a-f22d0fac13ba.png)

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

