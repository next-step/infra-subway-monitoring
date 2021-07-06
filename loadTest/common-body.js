import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export var testBody = {
    "run" : () => {
        let loginRes = testBody.로그인();

        testBody.로그인_검증(loginRes);

        let myObjects = testBody.나의정보_조회(loginRes);

        testBody.나의정보_검증(myObjects);

        let lineRes = testBody.라인_정보_조회(loginRes, 1);

        testBody.라인_정보_조회_검증(lineRes, 1);

        let pathsRes = testBody.경로_조회(loginRes, 1, 3)

        testBody.경로_조회_검증(pathsRes, 24)

        sleep(1);
    },

    "로그인" : () => {
        var payload = JSON.stringify({
            email: {USERNAME},
            password: {PASSWORD},
        });

        var params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };


        return http.post(`${BASE_URL}/login/token`, payload, params);
    },

    "로그인_검증" : (loginRes) => {
        check(loginRes, {
            '로그인 성공': (resp) => resp.json('accessToken') !== '',
        });
    },

    "나의정보_조회" : (loginRes) => {
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };

        return http.get(`${BASE_URL}/members/me`, authHeaders).json();
    },

    "나의정보_검증" : (myObjects) => {
        check(myObjects, { '나의 정보 조회 성공': (obj) => obj.id != 0 });
    },

    "라인_정보_조회" : (loginRes, lineNumber) => {
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };

        return http.get(`${BASE_URL}/lines/` + lineNumber, authHeaders).json();
    },

    "라인_정보_조회_검증" : (lineRes, lineNumber) => {
        check(lineRes, {
            '라인 정보 조회 성공': (resp) => resp['id'] == lineNumber,
        });
    },

    "경로_조회" : (loginRes, source, target) => {
        let authHeaders = {
            headers: {
                Authorization: `Bearer ${loginRes.json('accessToken')}`,
            },
        };

        return http.get(`${BASE_URL}/paths/?source=` + source + `&target=`+target, authHeaders).json();
    },

    "경로_조회_검증" : (pathsRes, exceptDistance) => {
        check(pathsRes, {
            '최단 경로 조회 성공': (resp) => resp['distance'] == exceptDistance,
        });
    }
};

