import task from '../task.js'
export let options = {
  stages: [
    // Ramp-up from 1 to 30 VUs in 1m
    { duration: '1m', target: 30 },
    // Ramp-up from 1 to 30 VUs in 3m
    { duration: '3m', target: 30},
    // Ramp-up from 30 to 0 VUs in 1m
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 200ms
  },
};



export default function ()  {
  task();
};

