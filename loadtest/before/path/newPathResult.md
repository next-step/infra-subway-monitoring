# Smoke Test

![image](https://user-images.githubusercontent.com/10750614/160059258-e3ce8059-eb18-4158-a638-03b76c1f8a80.png)

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

![image](https://user-images.githubusercontent.com/10750614/160059723-4c6c0c87-820e-4519-84d7-9293ae79c5ff.png)

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

![image](https://user-images.githubusercontent.com/10750614/160062622-13bdbc80-2d45-4892-909f-6261f6442b37.png)

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

![image](https://user-images.githubusercontent.com/10750614/160063198-14149cf2-4aa4-4ba2-8913-29a84827a9ae.png)

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

![image](https://user-images.githubusercontent.com/10750614/160066005-d386430c-abe1-4aa7-9541-4088d1c5a271.png)

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

