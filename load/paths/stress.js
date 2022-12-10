import http from 'k6/http';
import {check} from 'k6';

export let options = {
    stages: [
        {duration: '1m', target: 30},
        {duration: '1m', target: 55},
        {duration: '1m', target: 80},
        {duration: '1m', target: 100}
    ],

    thresholds: {
        http_req_duration: ['p(99)<2200']
    },
};

const BASE_URL = 'https://hey-mando.p-e.kr/';

export default function () {

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let index = http.get(`${BASE_URL}`, params)
    check(index, {
        "index page check": (resp) => resp.status === 200
    });

    let stations = http.get(`${BASE_URL}/stations`, params)
    check(stations, {
        "get stations check": (resp) => resp.status === 200
    });

    let source = Math.floor(Math.random() * 10 + 1);
    let target = Math.floor(Math.random() * 10 + 1);
    let findPath = http.get(`${BASE_URL}/paths/?source=${source}&target=${target}`)
    check(findPath, {
        "find path check": (resp) => resp.status === 200
    });
};
