import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

// 최소한의 부하로 구성된 테스트로, 테스트 시나리오에 오류가 없는지 확인할 수 있어요.
// 최소 부하 상태에서 시스템에 오류가 발생하지 않는지 확인할 수 있어요.
// VUser를 1 ~ 2로 구성하여 테스트합니다.

export let options = {
  vus: 2, // 2 user looping for 1 minute
  duration: '1m',

  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 0.1s
  },
};

const BASE_URL = 'https://www.epicarts.o-r.kr/';
const USERNAME = 'test@naver.com';
const PASSWORD = '1234';

export default function ()  {
  mainPage();
  login();
  pathSearch();

  sleep(1);
};

function mainPage() {
  const response = http.get(BASE_URL);

  check(response, {
      'entered in main page successfully': (res) => res.status === 200
  });
}

function login() {
	var payload = JSON.stringify({
		email: USERNAME,
		password: PASSWORD,
	  });
	
	  var params = {
		headers: {
		  'Content-Type': 'application/json',
		},
	  };
	
	
	  let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);
	
	  check(loginRes, {
		'logged in successfully': (resp) => resp.json('accessToken') !== '',
	  });
	
	  return loginRes.json('accessToken');
}

function pathSearch(accessToken){
	let authHeaders = {
	  headers: {
		Authorization: `Bearer ${accessToken}`,
	  },
	};

	let myObjects = http.get(`${BASE_URL}/paths?source=2&target=105`, authHeaders);
	check(myObjects, {
	  'search path authorized user success': (obj) => obj.status === 200
	});
}
  