import request from './request.js'

export let options = {
    stages: [
        {duration: '5m', target: 200},
        {duration: '5m', target: 300},
        {duration: '5m', target: 400},
        {duration: '5m', target: 300},
        {duration: '5m', target: 200},
        {duration: '5m', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

export default function () {
    request();
};
