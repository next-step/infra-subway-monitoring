import http from "k6/http";
import { check, group, sleep, fail } from "k6";
import { goFirstPage, login, goPathFindPage, findPath } from "./lib.js";

export let options = {
  stages: [
    { duration: "1m", target: 3 },
    { duration: "2m", target: 15 },
    { duration: "22m", target: 45 },
    { duration: "3m", target: 3 },
    { duration: "1m", target: 3 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<100"], // 99% of requests must complete below 1.5s
  },
};

const EMAIL = "test@email.com";
const PASSWORD = "password";

export default function () {
  goFirstPage();
  login(EMAIL, PASSWORD);
  goPathFindPage();
  findPath(5, 13);

  sleep(1);
}
