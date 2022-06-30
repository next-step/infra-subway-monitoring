import http from "k6/http";
import { check, group, sleep, fail } from "k6";

const avgVu = 260;
const maxVu = 2600;

export let options = {
  stages: [
    { duration: "30s", target: avgVu }, // simulate ramp-up of traffic from 1 to 100 users over 1 minute.
    { duration: "1m", target: maxVu }, // ramp-down to 0 users
    { duration: "30s", target: avgVu }, // stay at 100 users for 2 minutes
  ],
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
