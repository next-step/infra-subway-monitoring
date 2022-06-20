import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
	stages: [
		{duration: '5s', target: 5},
		{duration: '10s', target: 10},
		{duration: '10s', target: 20},
		{duration: '50s', target: 32},
		{duration: '50s', target: 50},
		{duration: '50s', target: 50},
		{duration: '10s', target: 40},
		{duration: '10s', target: 20},
		{duration: '5s', target: 10},
	],
	thresholds: {
		http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
	},
};


export default function () {
	main();
	login();
	const token = auth();
	favorites(token);
	path();
	shortestPath();
	mypage(token);
	sleep(1);
};

const BASE_URL = 'https://chj1768.p-e.kr';
const USERNAME = 'chj1768@gmail.com';
const PASSWORD = '1234';

export function main() {
	check(http.get(`${BASE_URL}/`), {'main': (res) => res.status === 200});
}

export function path() {
	check(http.get(`${BASE_URL}/path`), {'path': (res) => res.status === 200});
}

export function shortestPath() {
	check(http.get(`${BASE_URL}/paths?source=4&target=2`), {'shortestPath': (res) => res.status === 200});
}

export function login() {
	check(http.get(`${BASE_URL}/login`), {'login': (res) => res.status === 200});
}

export function auth() {
	const payload = JSON.stringify({
		email: USERNAME,
		password: PASSWORD,
	});

	const params = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	let res = http.post(`${BASE_URL}/login/token`, payload, params);

	check(res, {
		'logged in successfully': (res) => res.json('accessToken') !== '',
	});

	return res.json('accessToken');
}

export function mypage(accessToken) {
	let authHeaders = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
	const response = http.get(`${BASE_URL}/mypage`, authHeaders);
	check(response, {'mypage': (res) => res.status === 200});
}

export function favorites(accessToken) {
	let authHeaders = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};
	const response = http.get(`${BASE_URL}/favorites`, authHeaders);
	check(response, {'favorites': (res) => res.status === 200});
}
