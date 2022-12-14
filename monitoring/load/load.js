import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

// 서비스의 평소 트래픽과 최대 트래픽 상황에서 성능이 어떤지 확인합니다. 이 때 기능이 정상 동작하는지도 확인합니다.
// 애플리케이션 배포 및 인프라 변경(scale out, DB failover 등)시에 성능 변화를 확인합니다.
// 외부 요인(결제 등)에 따른 예외 상황을 확인합니다.

export let options = {
	stages: [
    { duration: '5m', target: 2 },
    { duration: '5m', target: 7 },
    { duration: '5m', target: 14 },
    { duration: '5m', target: 14 },
    { duration: '5m', target: 7 },
    { duration: '5m', target: 2 }
  ],
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
  clickPathSearch();
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

function clickPathSearch() {
	const response = http.get(`${BASE_URL}/path`);

	check(response, {
		'entered in path page successfully': (res) => res.status === 200
	});
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
