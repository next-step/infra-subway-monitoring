import http from "k6/http";
import { check, group, sleep, fail } from "k6";

export let options = {
	  vus: 1, // 1 user looping for 1 minute
	  duration: "10s",

	  thresholds: {
		      http_req_duration: ["p(99)<1500"], // 99% of requests must complete below 1s
		    },
};

const BASE_URL = 'https://www.nextstep-hun.kro.kr';
const USERNAME = 'ini8262@naver.com';
const PASSWORD = 'qwas1234';

export default function () {
	  var payload = JSON.stringify({
		      email: USERNAME,
		      password: PASSWORD,
		    });

	  var params = {
		      headers: {
			            "Content-Type": "application/json",
			          },
		    };

	  let main = http.get(`${BASE_URL}`);

	  check(main, { "load main successfully ": (resp) => resp.status === 200 });
}
