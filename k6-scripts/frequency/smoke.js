import { check, sleep } from 'k6'
import http from 'k6/http'

/**
 * 접속 빈도가 높은 페이지 - 메인
 * 로그인 - 내정보 조회 - 즐겨 찾기 조회
 *
 * VUser = 1
 * Throughput = 11.8 ~ 177
 * Latency = 100ms
 */

export let options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(99)<100'], // 99% of requests must complete below 100ms
  },
}

const BASE_URL = 'https://shinmj-nextstep.n-e.kr'
const USERNAME = 'shinmj@email.com'
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
