import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 3500 },
        { duration: '20s', target: 3500 },
        { duration: '10s', target: 4000 },
        { duration: '20s', target: 4000 },
        { duration: '10s', target: 5000 },
        { duration: '20s', target: 5000 },
        { duration: '20s', target: 0 },
    ],
};

const BASE_URL = 'http://jennie267-alb-2134274569.ap-northeast-2.elb.amazonaws.com';

export default function () {
    const before = new Date().getTime();
    const T = 2;

    http.get(`${BASE_URL}`);

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