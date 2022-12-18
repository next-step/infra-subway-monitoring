<p align="center">
    <img width="200px;" src="https://raw.githubusercontent.com/woowacourse/atdd-subway-admin-frontend/master/images/main_logo.png"/>
</p>
<p align="center">
  <img alt="npm" src="https://img.shields.io/badge/npm-%3E%3D%205.5.0-blue">
  <img alt="node" src="https://img.shields.io/badge/node-%3E%3D%209.3.0-blue">
  <a href="https://edu.nextstep.camp/c/R89PYi5H" alt="nextstep atdd">
    <img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fedu.nextstep.camp%2Fc%2FR89PYi5H">
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/next-step/atdd-subway-service">
</p>

<br>

# 인프라공방 샘플 서비스 - 지하철 노선도

<br>

## 🚀 Getting Started
   
### Install
#### npm 설치
```
cd frontend
npm install
```
> `frontend` 디렉토리에서 수행해야 합니다.

### Usage
#### webpack server 구동
```
npm run dev
```
#### application 구동
```
./gradlew clean build
```
<br>


### 1단계 - 웹 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요
#### 경쟁사와의 성능비교
| Desktop | 서울교통공사 | 네이버지도 | 카카오맵  | [Running Map](https://cylee9409-subway.o-r.kr/)|
|---------|-------------|-----------|----------|------------|
| FCP     |     1.5s    |    0.3s   |    0.6s  |     2.7s   |
| TTI     |     2.1s    |    4.0s   |    2.9s  |     2.8s   |
| SI      |     2.5s    |    3.6s   |    2.6s  |     2.7s   |
| TBT     |     300ms   |   1,100ms |  1,010ms |     30ms   |
| LCP     |     2.5s    |    4.1s   |    0.8s  |     2.8s   |
| CLS     |     0.001   |   0.019   |    0.018 |     0.004  |
performed by. [PageSpeed](https://pagespeed.web.dev/?utm_source=psi&utm_medium=redirect)

#### 목표 응답시간
경쟁사인 서울교통공사, 네이버지도, 카카오맵의 평균치에서 평균치 이하의 성능을 목표로 한다.
다만 경쟁사의 평균 성능 수치가 현 서비스의 수치 이상인 경우 현재 성능을 유지하는 것을 목표로 한다.

그 중 우선순위를 FCP(First Contentful Paint)에 높게 두어 해당 항목은 경쟁사의 최고 성능을 기준으로 한다.
경험에 의거하여 판단한다면 사용자 입장에서 특정 서비스를 시작할 때 처음 서비스가 기동되며 정상적으로 작동하는지에 대한 이미지가 그 서비스에 대한 첫 인상이 되기 때문이다.

대상 : [Running Map](https://cylee9409-subway.o-r.kr/)
| Desktop |   현재      |  목표      |
|---------|-------------|-----------|
| FCP     |     2.7s    |    0.3s   |
| TTI     |     2.8s    |    2.8s   |
| SI      |     2.7s    |    2.7s   |
| TBT     |     30ms    |    30ms   |
| LCP     |     2.8s    |    2.4s   |
| CLS     |     0.004   |   0.004   |

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스의 서버 목표 응답시간 가설을 세워보세요.
- 텍스트 압축 사용 (예상절감치 : 1.44s)
- 사용하지 않는 자바 스크립트 줄이기 (예상절감치 : 0.56s)
- 렌더링 차단 리소스 제거하기 (예상절감치 : 0.2s)

위의 항목들을 하며 목표 응답시간에 가까워지도록 성능을 개선한다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

#### 산정 배경
1. 예상 1일 사용자 수(DAU)  
   실제 한국 스마트폰 보급률은 95% 이상이기 때문에 한국 인구 전체가 스마트폰을 가졌다고 가정  
   이 중 지하철 이용을 위해 스마트폰 어플리케이션을 사용하는 인구 연령을 15 ~ 54세로 추정  
   2016년 기중 해당 연령 대한민국 총 인구수는 약 2600만  
   초창기 서비스인 Running Map의 경우 해당 인구 수의 10% 시장 점유를 가졌다고 가정할 때 예상 사용 인구는 총 260만  
* DAU = 2,600,000  

2. 최대 트래픽/평소 트래픽  
   출퇴근 시간 (오전 8:00 - 9:00 / 오후 6:00 - 7:00) 하루 2시간을 피크 시간으로 지정  
   전체 이용자의 80% 가 해당 시간대에 서비스를 이용한다고 가정  
* 평소 트래픽 = 2,600,000 * 0.8 * 2 = 4,160,000  
* 최대 트래픽 = 2,600,000 * 0.8 * 3 = 6,240,000  

3. 1명당 1일 평균 요청 수  
   전체 이용자의 80%가 하루 평균 2회의 요청을 한다고 가정  
* 1명당 1일 평균 요청 수 = 2  

4. Throughput 산정  
   1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수  
   2,600,000 * 2 = 5,200,000  
   1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps  
   5,200,000 / 86,400 = 60.18  
   1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps  
   60.18 * (6,240,000 / 4,160,000) = 90.27  

5. vUser 산정  
* T = (R * http_req_duration) (+ 1s)  
(2 * 0.6s) + 1 = 2.2s  
* VUser = (목표 rps * T) / R  
(60 * 2.2) / 2 = 66.19  
평균 VUser = 66  
(90 * 2.2) / 2 = 99.3  
최대 VUser = 99  

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요
* smoke.js
~~~

import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
          vus: 1,
          duration: '10s',

          thresholds: {
                      http_req_duration: ['p(99)<300'],
                    },
};


const BASE_URL = 'https://cylee9409-subway.o-r.kr/';

export default function run() {
            goMainPage();
            goFindPathPage();
            findPath();
}

function goMainPage() {
            const response = http.get(BASE_URL);
            check(response, {'Successfully Loaded Main Page' : (res) => res.status === 200});
}

function goFindPathPage() {
            const response = http.get(`${BASE_URL}/path`);
            check(response, {'Successfully Loaded FindPath Page' : (res) => res.status === 200});
}

function findPath() {
            const headerParams = {
                    headers: {
                            'Content-Type': 'application/json',
                    },
            };

            check(http.get(`${BASE_URL}/path?source=1&target=8`, headerParams), {
                            'Successfully find best path': (res) => res.status === 200
                        });
}

~~~

* load.js
~~~

import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {

        stages: [

                { duration: '1m' , target: 30 },
                { duration: '5m' , target: 66 },
                { duration: '10m', target: 66 },
                { duration: '1m' , target: 0  }
        ],

        thresholds: {
                      http_req_duration: ['p(99)<300'],
                    },
};


const BASE_URL = 'https://cylee9409-subway.o-r.kr/';

export default function run() {
            goMainPage();
            goFindPathPage();
            findPath();
}

function goMainPage() {
            const response = http.get(BASE_URL);
            check(response, {'Successfully Loaded Main Page' : (res) => res.status === 200});
}

function goFindPathPage() {
            const response = http.get(`${BASE_URL}/path`);
            check(response, {'Successfully Loaded FindPath Page' : (res) => res.status === 200});
}

function findPath() {
            const headerParams = {
                    headers: {
                            'Content-Type': 'application/json',
                    },
            };

            check(http.get(`${BASE_URL}/path?source=1&target=8`, headerParams), {
                            'Successfully find best path': (res) => res.status === 200
                        });
}


~~~

* stress.js
~~~

import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {

        stages: [

                { duration: '1m' , target: 75 },
                { duration: '5m' , target: 75 },
                { duration: '10m', target: 75 },
                { duration: '1m', target: 0 }
        ],

        thresholds: {
                      http_req_duration: ['p(99)<300'],
                    },
};


const BASE_URL = 'https://cylee9409-subway.o-r.kr/';

export default function run() {
            goMainPage();
            goFindPathPage();
            findPath();
}

function goMainPage() {
            const response = http.get(BASE_URL);
            check(response, {'Successfully Loaded Main Page' : (res) => res.status === 200});
}

function goFindPathPage() {
            const response = http.get(`${BASE_URL}/path`);
            check(response, {'Successfully Loaded FindPath Page' : (res) => res.status === 200});
}

function findPath() {
            const headerParams = {
                    headers: {
                            'Content-Type': 'application/json',
                    },
            };

            check(http.get(`${BASE_URL}/path?source=1&target=8`, headerParams), {
                            'Successfully find best path': (res) => res.status === 200
                        });
}


~~~

* 테스트 결과 test_result 에 첨부함
---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요
- service server 
경로 : /home/ubuntu/nextstep/infra-subway-monitoring/log
- proxy server
경로 : /var/log/nginx

2. Cloudwatch 대시보드 URL을 알려주세요
https://ap-northeast-1.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-1#dashboards:name=cylee9409-dashboard