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

## 미션

* 미션 진행 후에 아래 질문의 답을 작성하여 PR을 보내주세요.

### 1단계 - 인프라 운영하기
1. 각 서버내 로깅 경로를 알려주세요
   * 3.36.115.85 (https://lkimilhol-subway.p-e.kr/) - lkimilhol-EC2-external  
        로그백을 이용한 애플리케이션 로깅: /home/ubuntu/infra-subway-monitoring/log
        nginx 로그: /var/log/nginx
2. Cloudwatch 대시보드 URL을 알려주세요
   https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#dashboards:name=DASHBOARD-lkimilhol
---

### 2단계 - 성능 테스트
1. 웹 성능예산은 어느정도가 적당하다고 생각하시나요

2. 웹 성능예산을 바탕으로 현재 지하철 노선도 서비스는 어떤 부분을 개선하면 좋을까요

3. 부하테스트 전제조건은 어느정도로 설정하셨나요

4. Smoke, Load, Stress 테스트 스크립트와 결과를 공유해주세요


## 1단계 요구사항

* logback 설정 하기
* 로직에 로그를 심기
* 배포하여 로그가 파일로 제대로 남는지 체크
* Nginx Log 도커 마운트
* 클라우드 왓치 롤설정
* 클라우드 왓치 로그 에어전트 설치
* 로그 수집
* EC2 메트릭 수집
* 클라우드 메트릭스 대시보드 생성

## 1단계 질문

Q.  file 로깅에서 모든 파라메터를 남기는것은 파일 로깅을 하는 모든 메서드의 파라메터를 모두 조회하기 때문에 로그가 너무 광범위해지고 많은 메서드에 대해 많은 로그가 남는다는것이고

이번 PathLogging의 경우에는 경로 조회에 한하여 남기는 로기이기 때문에 이 로그의 경우에는 모든 argument까지 확인을 하여 의미 있는 로깅을 하도록 하자.

라고 이해해도 괜찮을까요?!

A. 
FileLogging 이든 PathLogging이든 적당한 단위로 제대로된 정보를 모두 남기고 있는지를 말씀드렸습니다.

1. log 분산
```
pathLogger.info("{}", joinPoint.getSignature().getName());
for (Object arg : joinPoint.getArgs()) {
pathLogger.info("{}, {}", REQUEST_PARAM, arg);
}
```
하나의 요청을 여러개의 로그로 분산해서 작성하고 있습니다. 분산 어플리케이션 멀티 스레드 환경에서 하나의 메서드에 대한 호출에서 무수히 많은 로그가 작성될 것이며, 이 로그는 가독도 충분하지도 않습니다.

멀티 스레드 환경에서 요청을 동시에 처리한다고 해봅니다.
```
AClassName
RequestParam, a
AClassName
RequestParam, a
RequestParam, b
RequestParam, c
AClassName
RequestParam, b
RequestParam, b
RequestParam, c
RequestParam, c
```
어떤 로그가 어떤 요청으로부터의 로그인지 확인이 어려우며, 트랜잭션 아이디를 로그에 부여한다고 하여도 가독이 매우 떨어집니다.

하나의 요청은 하나의 라인으로 작성하는 것이 좋습니다.
```
AClassName. a=a, b=b, c=c
AClassName. a=a, b=b, c=c
AClassName. a=a, b=b, c=c
```
2. 일반화 로그
PathLogging, FileLogging 을 언제 어느 곳에 적용해야할지 알기 어렵습니다. 또한 이 로그가 몇번째 argument 까지 로깅을 하는지도 매번 메서드를 작성할 때마다 그 순서와 중요한 매개변수가 무엇인지 확인해야합니다. 일반화를 할 것이라면, 메서드에 대한 모든 실행 정보를 하나의 라인에 충분하게 작성해야합니다.
   

Q. FileLogging 애노테이션을 사용하다보니, 말씀하신대로 이 애노티에션을 어떻게 어디에 써야 할지 조금 찜찜한 구석이 많아 컨트롤러에서 직접 로그를 찍게 하였습니다. (원래 애노테이션을 사용해서 한줄에 요청 응답을 남기도록 하였는데요. 다시 수정했습니다.)

컨트롤러에서 직접 파일로거의 이름을 명시해서 로거를 생상하였는데요. 보통은 LoggerFactory.getLogger(클래스.class) 식으로 로거를 생성하여 로거를 남기는 것으로 알고있는데요. 이렇게 하니 로그 파일에 제가 logger.info(로그 내용) 로 명시한 부분외로도 많은 로그들이 (같은 레벨의) 남게 되더라구요. 그래서 원하는 정보만 찍기 위해 LoggerFactory.getLogger("file") 식으로 로거를 생성하였습니다.

그런데 제가 한 방법이 옳은지를 잘 모르겠네요... LoggerFactory.getLogger(클래스.class) 식으로 생성하면 xml에서 패키지명을 지정할 순 있지만 그래도 다른 로그들이 찍혀버리고(스프링 부트의 로깅들...), xml 파일에 로거 설정에서 클래스명까지 명시하면 클래스마다 로거 설정을 새로 등록해야 하니 이 방법은 잘못된거 같았구요...! 아니면 LoggerFactory.getLogger(클래스.class) 내용들은 콘솔로만 출력하는것이 맞을지...
혹시 관련하여 피드백 한번 부탁드려도 될까요...?!

큰 수정 내용이 별로 없어야 했는데, 고민을 너무 깊게한거 같네요 ㅠㅠ 오랜시간이 걸렸습니다...!
피드벡 부탁드리겠습니다! 감사합니다!

ps. 혹시 실무에서는 애노테이션으로 서비스레이어에 로깅을 하는 방법은 사용하지 않나요?

A. 

1. 스프링의 로그가 함께 남는 것이 잘못된 일이라고 생각되지는 않습니다. 다만 지나치게 불필요한 다른 레벨의 로그들이 남을 수 있으니, 스프링 패키지에 대해 로그레벨을 별도로 지정해주어 해소될 수 있습니다. 서비스를 구성하면서 로그가 어디에 남을지를 고민하지는 않고 있으며, 필요한 경우 로그레벨에 대한 분리 정도는 하고 있습니다. 이것은 xml 의 설정만으로 구성이 가능합니다.

2. 애노테이션으로 서비스레이어에 로깅을 하는 방법은 거의 사용되지 않습니다. 각 서비스에 의미있는 로그 구성이 도움이 되기 때문에 일반화하여 작성하지 않고 있습니다. 대신 우리가 제어할 수 없는 특정 구간(http, event listener 등)에 대해서는 AOP나 Filter 를 사용하여 일반화된 로그를 남기고 있고, 이 때에는 모든 정보를 로그를 남기고 있습니다. 