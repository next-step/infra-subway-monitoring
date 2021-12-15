import http from 'k6/http';
import {sleep, check} from 'k6';

export const options = {
  stages: [
    {duration: '10s', target: 20},
    {duration: '10s', target: 50},
    {duration: '20s', target: 100},
    {duration: '10s', target: 150},
    {duration: '20s', target: 200},
    {duration: '10s', target: 100},
    {duration: '10s', target: 0},
  ],
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
