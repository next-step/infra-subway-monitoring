import { check, sleep } from 'k6'
import http from 'k6/http'

/**
 * 데이터를 갱신하는 페이지 - 노선 정보 변경
 * 로그인 - 노선 목록 조회 - 노선 정보 변경
 *
 * VUser = 1
 * Throughput = 11.8 ~ 177
 * Latency = 50~100ms
 */

export let options = {
  vus: 1,
  duration: '10s',
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
