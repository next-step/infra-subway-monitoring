import http from 'k6/http';
import { check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 12},
        { duration: '10s', target: 24},
        { duration: '5s', target: 36},
        { duration: '10s', target: 48},
        { duration: '5s', target: 60},
        { duration: '10s', target: 72},
        { duration: '5s', target: 0}
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500']
    },
};

const BASE_URL = 'https://www.woowabros.o-r.kr/';

export default () => {

    let homeUrl = `${BASE_URL}`;
    let lendingPageResponse = http.get(homeUrl);
    check(lendingPageResponse, {
        'lending page running': (response) => response.status === 200
    });
}