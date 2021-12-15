import http from 'k6/http';
import {check, sleep} from 'k6';

export let options = {
  vus: 2,
  duration: '10s',

  thresholds: {
    http_req_duration: ['p(99)<1000'],
  },
};

const BASE_URL = 'https://chaeyun17.p-e.kr';
const PARAMS = {headers: {'Content-Type': 'application/json'}};

export default function () {
  const pathResponse = http.get(`${BASE_URL}/paths/?source=1&target=3`, PARAMS).json();
  check(pathResponse, {'find path': obj => obj.distance !== 0});
  sleep(1);
}
