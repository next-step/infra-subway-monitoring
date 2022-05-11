import http from 'k6/http';
import {check, group, sleep, fail} from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 300 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 500 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 0.1s
    },
};

const BASE_URL = 'http://3.39.175.94:8080';

export default function () {
    var payload = JSON.stringify({
        id: 24,
        color: "red darken-1",
        createdDate: "2022-05-06T19:47:04.548422",
        modifiedDate: "2022-05-06T19:47:04.548422",
        name: "20호선",
        stations: [
            {
                "id": 1,
                "name": "녹양",
                "createdDate": "2021-01-06T09:32:00.901126",
                "modifiedDate": "2021-01-06T09:32:00.901126"
            },
            {
                "id": 5,
                "name": "대방",
                "createdDate": "2021-01-06T09:32:00.901126",
                "modifiedDate": "2021-01-06T09:32:00.901126"
            }
        ]
    });

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };


    let response = http.put(`${BASE_URL}/lines/24`, payload, params);

    check(response, {'retrieved member': (response) => response.status === 200});
    sleep(1);
};