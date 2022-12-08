import request from './request.js'

export let options = {
    stages: [
        {duration: '1m', target: 30},
        {duration: '1m', target: 60},
        {duration: '1m', target: 110},
        {duration: '1m', target: 220},
        {duration: '1m', target: 330},
        {duration: '1m', target: 440},
        {duration: '1m', target: 300},
        {duration: '1m', target: 200},
        {duration: '1m', target: 100},
        {duration: '1m', target: 0},
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
};

export default function () {
    request();
};
