import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 50 },
        { duration: '10s', target: 50 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 150 },
        { duration: '10s', target: 150 },
        { duration: '10s', target: 200 },
        { duration: '10s', target: 200 },
        { duration: '10s', target: 0 }
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'],
    },
};

const BASE_URL = 'https://ch3224bin.n-e.kr';

export default function ()  {

    let lineId = 1;

    let payload = JSON.stringify({
        name: '1호선',
        color: 'darkblue'
    });

    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let response = http.put(`${BASE_URL}/lines/${lineId}`, payload, params);

    check(response, {'updated successfully': (resp) => resp.status === 200});
    sleep(1);
};
