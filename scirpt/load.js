import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
    stages: [
        { duration: "5m", target: 92 }, // 92명의 user가 5분간 ramp-up
        { duration: "2m", target: 92 }, // 92명의 user가 2분간 머물러있음
        { duration: "10s", target: 0 } // ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ["p(99)<1500"] // 99% of requests must complete below 1.5s
    }
};

const BASE_URL = 'https://oper912-infra-subway.p-e.kr';
const USERNAME = 'test2@gmail.com';
const PASSWORD = 'password';

export function requestLogin() {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD
    });

    var params = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    return http.post(`${BASE_URL}/login/token`, payload, params);
}

export function requestMyInfo(loginRes) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json("accessToken")}`
        }
    };
    return http.get(`${BASE_URL}/members/me`, authHeaders).json();
}

export function updateMyInfo(loginRes) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json("accessToken")}`,
            "Content-Type": "application/json"
        }
    };
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
        age: 33
    });

    return http.put(`${BASE_URL}/members/me`, payload, authHeaders).json();
}

export function findPath(loginRes, source, target) {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json("accessToken")}`
        }
    };
    return http
        .get(
            `${BASE_URL}/paths/?source=` + source + `&target=` + target,
            authHeaders
        )
        .json();
}

export default function() {
    let loginRes = requestLogin();
    check(loginRes, {
        "logged in successfully": resp => resp.json("accessToken") !== ""
    });

    let myObjects = requestMyInfo(loginRes);
    check(myObjects, { "retrieved member": obj => obj.id != 0 });

    let updatedMyInfo = updateMyInfo(loginRes);
    check(updateMyInfo, { "updated info": obj => obj.id != 0 });

    let path = findPath(loginRes, 1, 2);
    check(path, { "path stations check": obj => obj.stations.length != 0 });

    sleep(1);
}
