import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 300,
    duration: '10s',

    thresholds: {
        http_req_duration: ['p(99)<1500'] // 99% of requests must complete below 1.5s
    }
};

export default function () {
    const before = new Date().getTime();
    const T = 2;

    http.get('http://codeleesh-alb-1028699757.ap-northeast-2.elb.amazonaws.com');

    const after = new Date().getTime();
    const diff = (after - before) / 1000;
    const remainder = T - diff;
    check(remainder, { 'reached request rate': remainder > 0 });
    if (remainder > 0) {
        sleep(remainder);
    } else {
        console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds`);
    }
}