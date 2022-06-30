import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
  vus: 1,
  duration: "1m",

  thresholds: {
    http_req_duration: ["p(99)<150"], // 99% of requests must complete below 0.15s
  },
};

const BASE_URL = "https://gwk.kro.kr";
const USERNAME = "giwankim@gmail.com";
const PASSWORD = "1234";

export default function () {
  const payload = JSON.stringify({
    email: USERNAME,
    password: PASSWORD,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

  check(loginRes, {
    "logged in successfully": (resp) => resp.json("accessToken") !== "",
  });

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${loginRes.json("accessToken")}`,
    },
  };

  const result = http.get(`${BASE_URL}/members/me`, authHeaders);

  check(result, {
    "retrieved member": (response) => response.status === 200,
  });
  sleep(1);
}
