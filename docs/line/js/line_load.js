import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
stages: [
    { duration: '10s', target: 4 },
    { duration: '20s', target: 45 },
    { duration: '10s', target: 0 },
],
thresholds: {
    http_req_duration: ['p(99)<200'],
    'response code was 200': ['p(99)<200'],
    },
};

const BASE_URL = 'https://wgs-runningmap.kro.kr/';

export default function ()  {

var payload = JSON.stringify({
    id:19,
    name:"용인경전철",
    color:"purple darken-3","stations":[],
    createdDate:"2021-01-06T09:32:00.901126",
    modifiedDate:"2021-05-20T17:30:31.890515"
});

var params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

let updateRes = http.put(`${BASE_URL}/lines/19`, payload, params);

check(updateRes, {
    'response code was 200': (res) => res.status == 200,
});

let getRes = http.get(`${BASE_URL}/lines`, params);

check(getRes, {
    'response code was 200': (res) => res.status == 200,
});

sleep(1);
};