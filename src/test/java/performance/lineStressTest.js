import http from 'k6/http';
import { sleep, check } from 'k6';

//r=2 목표rps=156-312
//http_req_duration=0.05
//T=2*0.05=0.1
//Vuser=((156-312)*0.1)/2=8-15
export let options = {
  stages: [
         { duration: '1m', target: 5 },
         { duration: '2m', target: 5 },
         { duration: '1m', target: 15 },
         { duration: '2m', target: 15 },
         { duration: '1m', target: 25 },
         { duration: '2m', target: 25 },
         { duration: '1m', target: 0 },
  ],
  thresholds: {
          http_req_duration: ['p(99)<100'],
      },
};

export default function () {
  const before = new Date().getTime();
  const T = 0.1;

  const res = http.get('https://madini.kro.kr/lines');
    check(res, {
      'lending page running': (response) => response.status === 200
    });

    const after = new Date().getTime();
    const diff = (after - before) / 1000;
    const remainder = T - diff;
    if (remainder > 0) {
      sleep(remainder);
    }
}