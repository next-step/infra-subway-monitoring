import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
    stages: [
        { duration: '5m', target: 20 },
        { duration: '10m', target: 51 },
        { duration: '5m', target: 10 },

    ],
    thresholds: {
        http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
    },
};

const BASE_URL = "https://www.kbh0581.r-e.kr";
const USERNAME = "kbh0581@gmail.com";
const PASSWORD = "1";



const login = () => {
    let payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    });

    let params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
    check(loginRes, {
        "logged in successfully": (resp) => resp.json("accessToken") !== "",
    });

    return loginRes.json("accessToken");
}

//경로 page 조회
const pathPageSearch = (accessToken) => {
    let authHeaders = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    };

    let pathPage = http.get(`${BASE_URL}/path`, authHeaders);
    check(pathPage, { "retrieved PATH PAGE:": (obj) => obj.status === 200});
}


//경로 조회 API
const pathSearch = () => {
    let pathApi = http.get(`${BASE_URL}/paths?source=19&target=21`)
    check(pathApi, {
        "Path Api success:": (res) => res.status === 200,
        "Path Api find path success:": (res) => res.json().hasOwnProperty("stations")}
    );
}


const favorites = (accessToken) => {
    let params = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    }

    let payload = JSON.stringify({
        source: 19,
        target: 21,
    });

    let favorites = http.post(`${BASE_URL}/favorites`, payload, params)
    check(favorites, {
            "create favorites:": (res) => res.status === 201
        }
    );
}

export default function () {
    //로그인
    const accessToken = login();

    // 경로조회 페이지 이동
    pathPageSearch(accessToken);

    // 경로 조회
    pathSearch();

    //즐겨찾기 등록
    favorites(accessToken);
}
