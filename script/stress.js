import http from "k6/http";
import { check, group, sleep, fail } from "k6";
import { goFirstPage, login, goPathFindPage, findPath } from "./lib.js";

export let options = {
  stages: [
    { duration: "1m", target: 50 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 150 },
    { duration: "1m", target: 250 },
    { duration: "1m", target: 300 },
    { duration: "1m", target: 350 },
    { duration: "1m", target: 350 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<100"],
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
