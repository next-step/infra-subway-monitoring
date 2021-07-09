import http from "k6/http";
import { check, group, sleep, fail } from "k6";
export let options = {
	  stages: [
		      { duration: "30s", target: 120 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
		      { duration: "1m", target: 120 }, // stay at 100 users for 10 minutes
		      { duration: "10s", target: 0 }, // ramp-down to 0 users
		      { duration: "30s", target: 120 },
		      { duration: "1m", target: 120 }, 
		      { duration: "10s", target: 0 }, 
		      { duration: "30s", target: 120 },
		      { duration: "1m", target: 120 },
		      { duration: "10s", target: 0 },
		    ],
	  thresholds: {
		      http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1.0s
		    },
};

const BASE_URL = 'https://www.nextstep-hun.kro.kr';
const USERNAME = 'ini8262@naver.com';
const PASSWORD = 'qwas1234';

export default function () {
	  var params = {
		      headers: {
			            "Content-Type": "application/json",
			          },
		    };
	  let main = http.get(`${BASE_URL}`);

	  check(main, { "load main successfully ": (resp) => resp.status === 200 });
	  sleep(1);
}
