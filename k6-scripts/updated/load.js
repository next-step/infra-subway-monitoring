import { check, sleep } from 'k6'
import http from 'k6/http'

/**
 * 데이터를 갱신하는 페이지 - 노선 정보 변경
 * 로그인 - 노선 목록 조회 - 노선 정보 변경
 *
 * Throughput = 11.8 ~ 177
 * Latency = 50~100ms
 *
 * vus
 * 11.8 x (3x1.5 ) /3 = 18,
 * 177 x (3x1.5)/3 = 266,
 */

export let options = {
  stages: [
    { duration: '5s', target: 18 },
    { duration: '5s', target: 266 },
    { duration: '20s', target: 18 },
    { duration: '20s', target: 266 },
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
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
