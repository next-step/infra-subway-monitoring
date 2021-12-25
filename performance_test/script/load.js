import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 10 }, // ramp-up
        { duration: '30s', target: 15 }, // middle
        { duration: '10s', target: 10 }, // ramp-down
    ],
};

const BASE_URL = 'https://devsigner9920.n-e.kr';
const data = JSON.stringify({name: 'test'});
const header = {headers: {'Content-Type': 'application/json'}};

export default function () {
    let smoke_post_test = http.post(`${BASE_URL}/stations`, data, header);

    check(smoke_post_test, {
        'load post test': (resp) => resp.status == 201,
    });
    let id = smoke_post_test.json().id;
    let smoke_delete_test = http.del(`${BASE_URL}/stations/${id}`);

    check(smoke_delete_test, {
        'load delete test': (resp) => resp.status == 204,
    });
    sleep(3);
}
