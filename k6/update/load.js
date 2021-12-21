import { check, sleep } from 'k6'
import http from 'k6/http'

export let options = {
    stages: [
        { duration: '5s', target: 18 },
        { duration: '5s', target: 266 },
        { duration: '20s', target: 18 },
        { duration: '20s', target: 266 },
    ],
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
            'Content-Type': 'application/json',
        },
    }

    let lines = http.get(`${BASE_URL}/lines`, authHeaders).json()
    check(lines, { 'retrieved lines': (resp) => resp.length > 0 })
    sleep(1)

    const lineId = lines[0].id
    let lineRequest = JSON.stringify({
        name: `test-line`,
    })

    let updatedLine = http.put(
        `${BASE_URL}/lines/${lineId}`,
        lineRequest,
        authHeaders
    )
    check(updatedLine, { 'update line success': (resp) => resp.status == 200 })
    sleep(1)
}
