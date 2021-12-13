import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

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
