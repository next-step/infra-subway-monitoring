import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

// 서비스가 극한의 상황에서 어떻게 동작하는지 확인합니다.
// 장기간 부하 발생에 대한 한계치를 확인하고 기능이 정상 동작하는지 확인합니다.
// 최대 사용자 또는 최대 처리량을 확인합니다.
// 스트레스 테스트 이후 시스템이 수동 개입없이 복구되는지 확인합니다.

export let options = {
	stages: [               
    { duration: '1m', target: 0 },
    { duration: '1m', target: 200 },
    { duration: '1m', target: 400 },
    { duration: '1m', target: 600 },
    { duration: '1m', target: 800 },
    { duration: '1m', target: 1000 },   
    { duration: '1m', target: 0 },
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
  