import http from 'k6/http';
import { check, sleep} from 'k6';

export let options = {
    stages: [
        { duration: '5s', target: 140},
        { duration: '10s', target: 160},
        { duration: '5s', target: 180},
        { duration: '10s', target: 200},
        { duration: '5s', target: 220},
        { duration: '10s', target: 240},
        { duration: '10s', target: 245},
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