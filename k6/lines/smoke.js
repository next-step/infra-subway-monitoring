import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<400'], // 99% of requests must complete below 1.5s
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

    const linesApiRes = http.get(`${BASE_URL}/lines`);
    check(linesApiRes, { 'lines page res code 200': (res) => res.status === 200 }, { headers: headers });
    sleep(1);
};