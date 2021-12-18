import http from 'k6/http';
import { check, sleep} from 'k6';

export let options = {
    vus: 2,
    duration : '10s',
    thresholds: {
        http_req_duration: ['p(99)<1500'] //요청의 99% 이상이 '1500ms' 이내에 끝나야 한다.
    }
};

const BASE_URL = 'https://www.woowabros.o-r.kr/';

export default () => {

    let homeUrl = `${BASE_URL}`;
    let lendingPageResponse = http.get(homeUrl);
    check(lendingPageResponse, {
        'lending page running': (response) => response.status === 200
    });
}