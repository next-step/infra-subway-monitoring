import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 210,
    duration: '30m',
};

export default function () {
    const before = new Date().getTime();
    const T = 2;

    http.get('https://lights93.o-r.kr/');

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