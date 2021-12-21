import { check, sleep } from 'k6'
import http from 'k6/http'

export let options = {
    stages: [
        { duration: '5s', target: 50 },
        { duration: '5s', target: 100 },
        { duration: '5s', target: 200 },
        { duration: '5s', target: 300 },
        { duration: '10s', target: 50 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 200 },
        { duration: '10s', target: 300 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
    },
}

const BASE_URL = 'https://tbvjdudfhr.kro.kr'

export default function () {
    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    let stationsRes = http.get(`${BASE_URL}/stations`, params)
    check(stationsRes, { 'retrieved stations': (resp) => resp.status === 200 })
    sleep(1)

    const stations = stationsRes.json()
    let paths = http
        .get(
            `${BASE_URL}/paths?source=${stations[0].id}&target=${stations[10].id}`,
            params
        )
    check(paths, { 'retrieved paths': (resp) => resp.status === 200 })
    sleep(1)
}
