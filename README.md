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

   1. 현재 성능

      <table>
         <tr>
            <th>Page</th>
            <th>Device</th>
            <th>First contentful paint(s)</th>
            <th>Speed index(s)</th>
            <th>Largest contentful paint(s)</th>
            <th>Time to interactive(s)</th>
            <th>Total blocking time(ms)</th>
            <th>Cumulative layout shift</th>
            <th>Lighthouse score</th>
         </tr>
         <tr>
            <td rowspan="2"><code>/</code></td>
            <td>Mobile</td>
            <td>14.9</td>
            <td>14.9</td>
            <td>15.5</td>
            <td>15.6</td>
            <td>610</td>
            <td>0.042</td>
            <td>30</td>
         </tr>
         <tr>
            <td>Desktop</td>
            <td>2.8</td>
            <td>2.8</td>
            <td>2.9</td>
            <td>2.9</td>
            <td>70</td>
            <td>0.004</td>
            <td>66</td>
         </tr>
         <tr>
            <td rowspan="2"><code>/stations</code></td>
            <td>Mobile</td>
            <td>16.4</td>
            <td>16.4</td>
            <td>16.4</td>
            <td>24.4</td>
            <td>7450</td>
            <td>0.000</td>
            <td>15</td>
         </tr>
         <tr>
            <td>Desktop</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>5.0</td>
            <td>1870</td>
            <td>0.000</td>
            <td>31</td>
         </tr>
         <tr>
            <td rowspan="2"><code>/lines</code></td>
            <td>Mobile</td>
            <td>16.5</td>
            <td>16.5</td>
            <td>16.5</td>
            <td>18.3</td>
            <td>1280</td>
            <td>0.353</td>
            <td>10</td>
         </tr>
         <tr>
            <td>Desktop</td>
            <td>2.9</td>
            <td>2.9</td>
            <td>2.9</td>
            <td>3.2</td>
            <td>180</td>
            <td>0.116</td>
            <td>59</td>
         </tr>
         <tr>
            <td rowspan="2"><code>/sections</code></td>
            <td>Mobile</td>
            <td>16.8</td>
            <td>16.8</td>
            <td>16.8</td>
            <td>17.1</td>
            <td>10</td>
            <td>0.000</td>
            <td>45</td>
         </tr>
         <tr>
            <td>Desktop</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>0</td>
            <td>0.000</td>
            <td>65</td>
         </tr>
         <tr>
            <td rowspan="2"><code>/path</code></td>
            <td>Mobile</td>
            <td>16.4</td>
            <td>16.4</td>
            <td>16.4</td>
            <td>17.1</td>
            <td>130</td>
            <td>0.004</td>
            <td>44</td>
         </tr>
         <tr>
            <td>Desktop</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>0</td>
            <td>0.000</td>
            <td>65</td>
         </tr>
         <tr>
            <td rowspan="2"><code>/login</code></td>
            <td>Mobile</td>
            <td>16.5</td>
            <td>16.5</td>
            <td>16.5</td>
            <td>16.5</td>
            <td>30</td>
            <td>0.000</td>
            <td>46</td>
         </tr>
         <tr>
            <td>Desktop</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>3.1</td>
            <td>20</td>
            <td>0.000</td>
            <td>64</td>
         </tr>
         <tr>
            <td rowspan="2"><code>/join</code></td>
            <td>Mobile</td>
            <td>16.1</td>
            <td>16.1</td>
            <td>16.1</td>
            <td>16.1</td>
            <td>30</td>
            <td>0.000</td>
            <td>46</td>
         </tr>
         <tr>
            <td>Desktop</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>3.0</td>
            <td>0</td>
            <td>0.000</td>
            <td>65</td>
         </tr>
      </table>
   
   2. 경쟁 서비스 성능

      <table>
         <tr>
            <th>Page</th>
            <th>Device</th>
            <th>First contentful paint(s)</th>
            <th>Speed index(s)</th>
            <th>Largest contentful paint(s)</th>
            <th>Time to interactive(s)</th>
            <th>Total blocking time(ms)</th>
            <th>Cumulative layout shift</th>
            <th>Lighthouse score</th>
         </tr>
         <tr>
            <td rowspan="2">서울교통공사</td>
            <td>Mobile</td>
            <td>6.7</td>
            <td>8.3</td>
            <td>11.2</td>
            <td>8.8</td>
            <td>1020</td>
            <td>0.000</td>
            <td>28</td>
         </tr>
         <tr>
            <td>Desktop</td>
            <td>1.4</td>
            <td>2.1</td>
            <td>1.7</td>
            <td>1.9</td>
            <td>210</td>
            <td>0.001</td>
            <td>79</td>
         </tr>
         <tr>
            <td rowspan="2">네이버지도(모바일)</td>
            <td>Mobile</td>
            <td>2.1</td>
            <td>5.4</td>
            <td>7.9</td>
            <td>5.8</td>
            <td>250</td>
            <td>0.030</td>
            <td>61</td>
         </tr>
         <tr>
            <td>Desktop</td>
            <td>0.5</td>
            <td>2.6</td>
            <td>1.7</td>
            <td>0.5</td>
            <td>0</td>
            <td>0.006</td>
            <td>87</td>
         </tr>
         <tr>
            <td>네이버지도(PC)</td>
            <td>Desktop</td>
            <td>0.5</td>
            <td>3.5</td>
            <td>2.4</td>
            <td>4.6</td>
            <td>830</td>
            <td>0.020</td>
            <td>47</td>
         </tr>
         <tr>
            <td>카카오맵(PC)</td>
            <td>Desktop</td>
            <td>0.6</td>
            <td>2.8</td>
            <td>2.4</td>
            <td>3.4</td>
            <td>840</td>
            <td>0.721</td>
            <td>36</td>
         </tr>
      </table>

   3. 성능 예산

      * 경쟁 서비스 중 해당 지표가 가장 빠른 것과 차이를 느끼지 못하게(20% 이상 느리지 않게) 한다.
        * 근거: https://www.smashingmagazine.com/2015/09/why-performance-matters-the-perception-of-time/#the-need-for-performance-optimization-the-20-rule 
      * Desktop에서 각 지표는 3초 이내로 한다.
        * 근거: https://blog.rightbrain.co.kr/?p=12479
      * 모든 페이지에서 lighthouse 80점 이상을 목표로 한다.
      * Cumulative layout shift는 0.1 이하로 한다.
        * 근거: https://web.dev/i18n/ko/cls/#%EC%A2%8B%EC%9D%80-cls-%EC%A0%90%EC%88%98%EB%8A%94-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94

      <table>
         <tr>
            <th>Metric</th>
            <th>Mobile</th>
            <th>Desktop</th>
         </tr>
         <tr>
            <td>First contentful paint(s)</td>
            <td>2.5(2.1 * 1.2)</td>
            <td>0.6(0.5 * 1.2)</td>
         </tr>
         <tr>
            <td>Speed index(s)</td>
            <td>6.5(5.4 * 1.2)</td>
            <td>2.5(2.1 * 1.2)</td>
         </tr>
         <tr>
            <td>Largest contentful paint(s)</td>
            <td>9.5(7.9 * 1.2)</td>
            <td>2.0(1.7 * 1.2)</td>
         </tr>
         <tr>
            <td>Time to interactive(s)</td>
            <td>7.0(5.8 * 1.2)</td>
            <td>0.6(0.5 * 1.2)</td>
         </tr>
         <tr>
            <td>Total blocking time(s)</td>
            <td>6.5(5.4 * 1.2)</td>
            <td>2.5(2.1 * 1.2)</td>
         </tr>
         <tr>
            <td>Cumulative layout shift</td>
            <td>0.1</td>
            <td>0.1</td>
         </tr>
         <tr>
            <td>Lighthouse score</td>
            <td>80</td>
            <td>80</td>
         </tr>
      </table>

  * Raw data
     [/data.xlsx](/data.xlsx)

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

   * 텍스트 기반의 리소스를 압축하여 제공한다.
   * 사용하지 않는 자바스크립트를 줄이고 스크립트가 필요할 때까지 로딩을 지연시킨다.
   * 필수적이지 않은 리소스의 로딩을 지연시킨다.
   * 정적 리소스에 대해 캐시 TTL을 적절히 설정한다.
   * 웹폰트가 로드되기 전에도 텍스트가 시스템 폰트로 표시될 수 있도록 설정한다.

---

### 2단계 - 부하 테스트 
1. 부하테스트 전제조건은 어느정도로 설정하셨나요

2. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요

---

### 3단계 - 로깅, 모니터링
1. 각 서버내 로깅 경로를 알려주세요

2. Cloudwatch 대시보드 URL을 알려주세요
