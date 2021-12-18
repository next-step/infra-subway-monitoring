import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1, // 1 user looping for 1 minute
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://chapitak.kro.kr';

export default function ()  {

    var payload = JSON.stringify({
        color: "bg-red-600",
        distance: 15,
        name: "구분당선",
        downStationId: 2,
        upStationId: 1
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let updateRes = http.put(`${BASE_URL}/lines/1`, payload, params);

    check(updateRes, {
        'updated successfully': (resp) => resp.status === 200,
    });

    sleep(1);
};
