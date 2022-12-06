import task from '../task.js'
export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '30s', target: 40 },
    { duration: '30s', target: 80 },
    { duration: '30s', target: 120 },
    { duration: '1m', target: 180 },
    { duration: '1m', target: 230 },
    { duration: '1m', target: 280 },
    { duration: '1m', target: 350 },
    { duration: '1m', target: 280 },
    { duration: '30s', target: 230 },
    { duration: '30s', target: 200 },
    { duration: '30s', target: 150 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 200ms
  },
};



export default function ()  {
  task();
};

