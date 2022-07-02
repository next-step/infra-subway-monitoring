import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export const options = {
	vus: 1, // 1 user looping for 1 minute
	duration: '1m',

	thresholds: {
		http_req_duration: ['p(99) < 100'], // 99% of requests must complete
		// below 0.1s
	},
};

const BASE_URL = 'https://sonypark.shop';
const USERNAME = 'sonypark@gmail.com';
const PASSWORD = 'a123b';

export default function ()  {
	mainPage();

	const accessToken = login();

	getFavorites(accessToken);

	getPath(accessToken);

	sleep(1);
};

function mainPage() {
	const mainPageRes = http.get(`${BASE_URL}`);
	check(mainPageRes, {
		'goToMainPage success': (resp) => resp.status == 200,
	});
}

function login() {
	const payload = JSON.stringify({
		email: USERNAME,
		password: PASSWORD,
	});

	const params = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

	check(loginRes, {
		'logged in successfully': (resp) => resp.json('accessToken') !== '',
	});

	return loginRes.json('accessToken');
}

function getFavorites(accessToken) {
	const params = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ` + accessToken
		}
	}

	const response = http.get(`${BASE_URL}/favorites`, params).json();

	check(response, {
		'get favorites successfully': (obj) => obj.id != 0
	});
}

function getPath(accessToken) {
	const header = {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		}
	};
	const response = http.get(`${BASE_URL}/path?source=1&target=2`, header);

	check(response, {'경로 검색' : (res) => res.status === 200 });
}
