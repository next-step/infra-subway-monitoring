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

export default function () {
    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    let stations = http.get(`${BASE_URL}/stations`, params).json()
    check(stations, { 'retrieved stations': (resp) => resp.length > 0 })
    sleep(1)

    let paths = http
        .get(
            `${BASE_URL}/paths?source=${stations[0].id}&target=${stations[10].id}`,
            params
        )
        .json()
    check(paths, { 'retrieved paths': (resp) => resp.distance >= 0 })
    sleep(1)
}
