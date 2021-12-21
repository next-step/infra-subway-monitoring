import { check, sleep } from 'k6'
import http from 'k6/http'

export let options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
}

const BASE_URL = 'https://tbvjdudfhr.kro.kr'
const USERNAME = 'tbvjdudfhr@email.com'
const PASSWORD = '1234'

export default function () {
    var payload = JSON.stringify({
        email: USERNAME,
        password: PASSWORD,
    })

    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params)

    check(loginRes, {
        'logged in successfully': (resp) => resp.json('accessToken') !== '',
    })

    let authHeaders = {
        headers: {
            Authorization: `Bearer ${loginRes.json('accessToken')}`,
        },
    }
    let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json()
    check(myObjects, { 'retrieved member': (obj) => obj.id != 0 })
    sleep(1)

    let favorites = http.get(`${BASE_URL}/favorites`, authHeaders).json()
    check(favorites, { 'retrieved favorite': (obj) => obj.id != 0 })
    sleep(1)
}
