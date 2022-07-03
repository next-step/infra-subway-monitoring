import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
		{ duration: '5m', target: 4 },
		{ duration: '5m', target: 9 },
		{ duration: '5m', target: 19 },
        { duration: '5m', target: 19 },
		{ duration: '5m', target: 9 },
		{ duration: '5m', target: 4 },
        { duration: '5m', target: 0 }
	],
  
    thresholds: {
      http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
}

const BASE_URL = 'https://infra.koo.gg/'
const USERNAME = '0n1dev@koo.gg'
const PASSWORD = '0n1dev'

export default function ()  {
    mainPageTest();
    stationPageTest();
    let accessToken = loginTest()
    favoriteTest(accessToken)
  
    sleep(1);
}

function mainPageTest() {
    let mainPageRes = http.get(BASE_URL)

    check(mainPageRes, {
        'mainPageTest in successfully': (resp) => resp.status === 200
    })
}

function stationPageTest() {
    let stationPageRes = http.get(BASE_URL + 'stations')

    check(stationPageRes, {
        'stationPageTest in successfully': (resp) => resp.status === 200
    })
}

function loginTest() {
    let body = JSON.stringify({
        email: USERNAME,
        password: PASSWORD
    })

    let params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let loginRes = http.post(`${BASE_URL}/login/token`, body, params);

    check(loginRes, {
        'loginTest in successfully': (resp) => resp.json('accessToken') !== ''
    })

    return loginRes.json('accessToken')
}

function favoriteTest(accessToken) {
    let body = JSON.stringify({
        source: 2,
        target: 5
    })

    let params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }

    let favoriteRes = http.post(`${BASE_URL}/favorites`, body, params)

    check(favoriteRes, {
        'favoriteTest in successfully': (resp) => resp.status === 201
    })
}