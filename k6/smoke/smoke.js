import task from '../task.js'
export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests must complete below 200ms
  },
};



export default function ()  {
  task();
};

