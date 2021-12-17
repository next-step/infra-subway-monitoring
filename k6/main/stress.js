import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    stages: [
        {duration: '30s', target: 100}, // below normal load
        {duration: '60s', target: 100},
        {duration: '30s', target: 400}, // normal load
        {duration: '60s', target: 400},
        {duration: '30s', target: 600}, // around the breaking point
        {duration: '60s', target: 600},
        {duration: '30s', target: 2000}, // beyond the breaking point
        {duration: '60s', target: 2000},
        {duration: '10s', target: 0}, // scale down. Recovery stage.
    ],
};

const BASE_URL = 'https://hidy.kro.kr';

export default function () {
    http.get(`${BASE_URL}`);
    sleep(1);
}