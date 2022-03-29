import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
        { duration: '10m', target: 156 },
        { duration: '10m', target: 156 },
        { duration: '10m', target: 0 },
    ],
  thresholds: {
          http_req_duration: ['p(99)<500'],
      },
};

export default function () {
  const before = new Date().getTime();
  const T = 1.5;

  const res = http.get('https://madini.kro.kr/');
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