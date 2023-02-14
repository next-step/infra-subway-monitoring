import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
    scenarios: {
        stress: {
            executor: "ramping-arrival-rate",
            preAllocatedVUs: 230,
            timeUnit: "1s",
            stages: [
                { duration: "10s", target: 10 },
                { duration: "1m", target: 10 },
                { duration: "10s", target: 100 },
                { duration: "3m", target: 100 },
                { duration: "10s", target: 10 },
                { duration: "3m", target: 10 },
                { duration: "10s", target: 0 },
            ],
            gracefulStop: "2m",
        },
    },
};

const BASE_URL = 'http://192.168.2.49:8080';

export default function() {

    const source = Math.random() * 7 + 1;
    const target = Math.random() * 7 + 1;

    const stations = http.get(`${BASE_URL}/stations`);
    check(stations, { 'get stations': (res) => res.status === 200 });

    const path = http.get(`${BASE_URL}/paths/?source=3&target=6`);
    check(path, { 'get path': (res) => res.status === 200 });
    sleep(1);
};