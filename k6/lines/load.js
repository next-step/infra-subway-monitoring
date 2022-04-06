import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        {duration: '10s', target: 7},
        {duration: '20s', target: 20},
        {duration: '20s', target: 69},
        {duration: '20s', target: 69},
        {duration: '10s', target: 30},
        {duration: '10s', target: 7},
        {duration: '10s', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<200'], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = 'https://pleasesubway.p-e.kr';

export default function ()  {
    const linesPageRes = http.get(`${BASE_URL}/lines`);
    check(linesPageRes, { 'lines page res code 200': (res) => res.status === 200 });

    const data = {
        color: "grey darken-4",
        createdDate: "2021-01-06T18:32:00.901126",
        id: 21,
        modifiedDate: "2022-04-05T15:13:22.417151",
        name: "의정부경전철",
        stations: []
    };
    const headers = { 'Content-Type': 'application/json' };

    const linesUpdateRes = http.put(`${BASE_URL}/lines/21`, JSON.stringify(data), { headers: headers });
    check(linesUpdateRes, { 'update res code 200': (res) => res.status === 200 });

    const linesApiRes = http.get(`${BASE_URL}/lines`, { headers: headers });
    check(linesApiRes, { 'lines page res code 200': (res) => res.status === 200 });
    sleep(1);
};