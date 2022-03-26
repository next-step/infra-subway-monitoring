import http from 'k6/http';

export let options = {
    stages: [
        { duration: '10m', target: 20 },
        { duration: '10m', target: 60 },
        { duration: '10m', target: 100 },
        { duration: '10m', target: 150 },
        { duration: '10m', target: 200 },
        { duration: '10m', target: 250 },
        { duration: '10m', target: 300 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<1500'], //1.5 초이내에 요청의 99% 완료
        http_req_failed: ['rate<0.01'], // 요청의 1%미만 실패
    },
};

const BASE_URL = 'https://donghwani.p-e.kr';

export default function ()  {

    // 메인페이지 접근
    http.get(`${BASE_URL}`);

    //경로 검색 페이지 접근
    http.get(`${BASE_URL}/path`);

    //등록된 역정보 조회
    http.get(`${BASE_URL}/stations`)

    //최단 경로 조회
    http.get(`${BASE_URL}/paths?source=1&target=2`);

};
