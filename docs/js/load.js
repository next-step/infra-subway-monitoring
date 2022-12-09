import request from './request.js'

export let options = {
    stages: [
        {duration: '1m', target: 31},
        {duration: '3m', target: 31},
        {duration: '1m', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

export default function () {
    request();
};
