import http from "k6/http";
import { check, group, sleep, fail } from "k6";
import { goFirstPage, login, goPathFindPage, findPath } from "./lib.js";

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: "10s",

  thresholds: {
    http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.5s
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
