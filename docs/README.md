## Step2 부하 테스트

### 요구사항
#### 부하 테스트
- [x] 테스트 전제조건 정리
- [x] 대상 시스템 범위
- [x] 목푯값 설정 (latency, throughput, 부하 유지기간)
- [x] 부하 테스트 시 저장될 데이터 건수 및 크기
- [x] 각 시나리오에 맞춰 스크립트 작성
- [x] 접속 빈도가 높은 페이지
- [x] 데이터를 갱신하는 페이지
- [x] 데이터를 조회하는데 여러 데이터를 참조하는 페이지
- [x] Smoke, Load, Stress 테스트 후 결과를 기록

#### 부하테스트 소개
* k6 설치
```shell
  $ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
  $ echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
  $ sudo apt-get update
  $ sudo apt-get install k6
```
* Smoke Test
```
  $ k6 run smoke.js
```

#### smoke.js
```java
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';
   export let options = {
      vus: 1, // 1 user looping for 1 minute
      duration: '10s',
      thresholds: {
        http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
      },
   };

   const BASE_URL = '[Target URL]';
   const USERNAME = 'test id';
   const PASSWORD = 'test password';

export default function ()  {

   var payload = JSON.stringify({
      email: USERNAME,
      password: PASSWORD,
   });

   var params = {
      headers: {
        'Content-Type': 'application/json',
      },
   };


    let loginRes = http.post(`${BASE_URL}/login/token`, payload, params);

   check(loginRes, {
       'logged in successfully': (resp) => resp.json('accessToken') !== '',
   });

   
   let authHeaders = {
      headers: {
           Authorization: `Bearer ${loginRes.json('accessToken')}`,
      },
   };
   let myObjects = http.get(`${BASE_URL}/members/me`, authHeaders).json();
   check(myObjects, { 'retrieved member': (obj) => obj.id != 0 });
   sleep(1);
};
```

```
export let options = {
   stages: [
      { duration: '1m', target: 500 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
      { duration: '2m', target: 500 }, // stay at 100 users for 10 minutes
      { duration: '10s', target: 0 }, // ramp-down to 0 users
   ],
   thresholds: {
      http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
      'logged in successfully': ['p(99)<1500'], // 99% of requests must complete below 1.5s
   },
};
```

* 테스트 설정값 구하기
1. 목표 rps 구하기
   - a. 우선 예상 1일 사용자 수(DAU)를 정해봅니다.
   - b. 피크 시간대의 집중률을 예상해봅니다. (최대 트개픽 / 평소 트래픽)
   - c. 1명당 1일 평균 접속 혹은 요청수를 예상해봅니다.
   - d. 이를 바탕으로 Throughput을 계산합니다.

- Throughput : 1일 평균 rps ~ 1일 최대 rps
- 1일 사용자 수(DAU) x 1명당 1일 평균 접속 수 = 1일 총 접속 수
- 1일 총 접속 수 / 86,400 (초/일) = 1일 평균 rps
- 1일 평균 rps x (최대 트래픽 / 평소 트래픽) = 1일 최대 rps


2. VUser 구하기
   - Request Rate: measured by the number of requests per second (RPS)
   - VU: the number of virtual users
   - R: the number of requests per VU iteration
   - T: a value larger than the time needed to complete a VU iteration
   - T = (R * http_req_duration) (+ 1s) ; 내부망에서 테스트할 경우 예상 latency를 추가한다

- VUser = (목표 rps * T) / R
- 가령, 두개의 요청 (R=2)이 있고, 왕복시간이 0.5s, 지연시간이 1초라고 가정할 때 (T=2), 계산식은 아래와 같다.
- VU = (300 * 2) / 2 = 300

3. 테스트 기간
   - 일반적으로 Load Test는 보통 30분 ~ 2시간 사이로 권장합니다. 부하가 주어진 상황에서 DB Failover, 배포 등 여러 상황을 부여하며 서비스의 성능을 확인합니다.

4. 부하테스트
```shell
   $ k6 run --out influxdb=http://localhost:8086/myk6db smoke.js
```


## Step3 로깅, 모니터링
### 요구사항
- [] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [] 로그 설정하기
- [] Cloudwatch로 모니터링

### 요구사항 설명
- 저장소를 활용하여 아래 요구사항을 해결합니다.
- README 에 있는 질문에 답을 추가한 후 PR을 보내고 리뷰요청을 합니다.
#### 로그 설정하기
- [] Application Log 파일로 저장하기
  - 회원가입, 로그인 등의 이벤트에 로깅을 설정
  - 경로찾기 등의 이벤트 로그를 JSON으로 수집
- [] Nginx Access Log 설정하기

#### Cloudwatch로 모니터링
- [] Cloudwatch로 로그 수집하기
- [] Cloudwatch로 메트릭 수집하기
- [] USE 방법론을 활용하기 용이하도록 대시보드 구성

#### 힌트
A. 로깅
##### 주의점
- Avoid side effects
  - logging으로 인해 애플리케이션 기능의 동작에 영향을 미치지 않아야 합니다.
  - 예를 들어 logging하는 시점에 NullPointerException이 발생해 프로그램이 정상적으로 동작하지 않는 상황이 발생하면 안됩니다.
- Be concise and descriptive
  - 각 Logging에는 데이터와 설명이 모두 포함되어야 합니다.
- Log method arguments and return values
  - 메소드의 input과 output을 로그로 남기면 debugger를 사용해 디버깅하지 않아도 됩니다. 특히 debugger를 사용할 수 없는 상황에서는 상당히 유용하게 사용할 수 있습니다.
  - 이를 구현하려면 메소드 앞 부분과 뒷 부분에 지저분한 중복 코드가 계속해서 발생하는 상황이 발생하는데 이는 AOP를 통해 해결할 수 있습니다.
- Delete personal information
  - 로그에 사용자의 전화번호, 계좌번호, 패스워드, 주소, 전화번호와 같은 개인정보를 남기지 않습니다.

##### logging level
Logging Level을 적절하게 나눠 구현하는 것이 신경쓰면서 개발해야 합니다.
- ERROR : 예상하지 못한 심각한 문제가 발생하여 즉시 조사해야 함
- WARN : 로직상 유효성 확인, 예상 가능한 문제로 인한 예외처리 등을 남김, 서비스는 운영될 수 있지만, 주의해야 함
- INFO : 운영에 참고할만한 사항으로, 중요한 비즈니스 프로세스가 완료됨
- DEBUG / TRACE : 개발 단계에서만 사용하고 운영 단계에서는 사용하지 않음
- 즉, DEBUG 레벨로 설정하면 DEBUG 레벨보다 높은 로그 레벨의 메시지가 모두(DEBUG, INFO, WARN, ERROR) 출력됩니다. ERROR 레벨로 설정하면 ERROR 레벨의 로그만 출력되는 방식으로 동작합니다.

B. Application Log
- 애플리케이션의 상태를 확인하기 위해서는 로그를 남기는 것이 중요합니다. 무엇을 로그로 남겨야 할지, 로그를 어떻게 관리해야 할지 고민해보며 학습해보세요.


* 예제 코드를 참고하여 미션을 진행합니다.
- a. logback.xml을 작성합니다.
- logback의 기본 설정 파일은 logback.xml 입니다. logback 라이브러리는 classpath 아래에 위치하는 logback.xml을 기본으로 찾아봅니다.

```xml  
<configuration debug="false">

    <!--spring boot의 기본 logback base.xml은 그대로 가져간다.-->
    <include resource="org/springframework/boot/logging/logback/base.xml" />
    <include resource="file-appender.xml" />

    <!--    logger name이 file일때 적용할 appender를 등록한다.-->
    <logger name="file" level="INFO" >
        <appender-ref ref="file" />
    </logger>
</configuration>
```    
```xml
    <property name="home" value="log/" />

    <!--  appender이름이 file인 consoleAppender를 선언  -->
    <appender name="file" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!--로깅이 기록될 위치-->
        <file>${home}file.log</file>
        <!--로깅 파일이 특정 조건을 넘어가면 다른 파일로 만들어 준다.-->
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${home}file-%d{yyyyMMdd}-%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>15MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
        </rollingPolicy>
        <!--   해당 로깅의 패턴을 설정   -->
        <encoder>
            <charset>utf8</charset>
            <Pattern>
                %d{yyyy-MM-dd HH:mm:ss.SSS} %thread %-5level %logger - %m%n
            </Pattern>
        </encoder>
    </appender>
```
- logger: 실제 로그 기능을 수행하는 객체로 각 Logger마다 Name을 부여하여 사용합니다.



- b. logback을 이용하여 logging을 찍어봅니다.
```java
   private static final Logger log = LoggerFactory.getLogger(Controller.class);
   private static final Logger fileLogger = LoggerFactory.getLogger("file");
    ...
    log.error("An ERROR Message");
    fileLogger.info("파일 로깅 입니다.");
```

- c. JSON 로그를 사용한 이벤트 로그 수집
- src/main/resources/logback.xml
```xml
<encoder class="net.logstash.logback.encoder.LogstashEncoder" >
   <includeContext>true</includeContext>
   <includeCallerData>true</includeCallerData>
   <timestampPattern>yyyy-MM-dd HH:mm:ss.SSS</timestampPattern>
   <fieldNames>
      <timestamp>timestamp</timestamp>
      <thread>thread</thread>
      <message>message</message>
      <stackTrace>exception</stackTrace>
      <mdc>context</mdc>
   </fieldNames>
</encoder>
```
```xml
dependencies {
   implementation("net.logstash.logback:logstash-logback-encoder:6.1")
}
```
```java
   // static import net.logstash.logback.argument.StructuredArguments.kv
   log.info("{}, {}",
   kv("출발지", source.getName()),
   kv("도착지", target.getName())
   );
);
```

- C. Nginx Log
- volume 옵션을 활용하여 호스트의 경로와 도커의 경로를 마운트합니다.
```shell
$ docker run -d -p 80:80 -v /var/log/nginx:/var/log/nginx nextstep/reverse-proxy
```

- D. 도커 상태 확인하기(cAdvisor 설치하기)
```shell
docker run \
--volume=/:/rootfs:ro \
--volume=/var/run:/var/run:ro \
--volume=/sys:/sys:ro \
--volume=/var/lib/docker/:/var/lib/docker:ro \
--volume=/dev/disk/:/dev/disk:ro \
--publish=8080:8080 \
--detach=true \
--name=cadvisor \
google/cadvisor:latest
```

- Docker로 운영하는 경우 cAdvisor를 활용하여 간단한 모니터링이 가능합니다.

- 호스트 리소스 모니터링에 필요한 디렉토리를 볼륨으로 지정
- 보안을 위해 읽기 전용으로 볼륨 지정
- 포트는 8080으로 오픈

- E. Cloudwatch로 수집하기
  - a. EC2에 IAM role 설정 
  - b. cloudwatch logs agent를 설치합니다.
```shell
$ curl https://s3.amazonaws.com/aws-cloudwatch/downloads/latest/awslogs-agent-setup.py -O

$ sudo python ./awslogs-agent-setup.py --region  ap-northeast-2
```
   - c. 로그 수집
```shell
$ sudo vi /var/awslogs/etc/awslogs.conf

[/var/log/syslog]
datetime_format = %b %d %H:%M:%S
file = /var/log/syslog
buffer_duration = 5000
log_stream_name = {instance_id}
initial_position = start_of_file
log_group_name = [로그그룹 이름]

[/var/log/nginx/access.log]
datetime_format = %d/%b/%Y:%H:%M:%S %z
file = /var/log/nginx/access.log
buffer_duration = 5000
log_stream_name = access.log
initial_position = end_of_file
log_group_name = [로그그룹 이름]

[/var/log/nginx/error.log]
datetime_format = %Y/%m/%d %H:%M:%S
file = /var/log/nginx/error.log
buffer_duration = 5000
log_stream_name = error.log
initial_position = end_of_file
log_group_name = [로그그룹 이름]
```
```shell
$ sudo service awslogs restart
```
- 로그그룹 이름은 자신의 github id 로 지정합니다.


- d. Metric 수집
* EC2 Metric 수집
```shell
  $ wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
  $ sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
```
```json
# /opt/aws/amazon-cloudwatch-agent/bin/config.json
{
   "agent": {
      "metrics_collection_interval": 60,
      "run_as_user": "root"
   },
   "metrics": {
      "metrics_collected": {
         "disk": {
            "measurement": [
               "used_percent",
               "used",
               "total"
            ],
            "metrics_collection_interval": 60,
            "resources": [
              "*"
            ]
         }, 
         "mem": {
            "measurement": [
               "mem_used_percent",
               "mem_total",
               "mem_used"
            ],
            "metrics_collection_interval": 60
         }
      }
   }
}
```
```shell
$ sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:/opt/aws/amazon-cloudwatch-agent/bin/config.json
$ sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -m ec2 -a status
{
   "status": "running",
   "starttime": "2021-03-20T15:12:07+00:00",
   "configstatus": "configured",
   "cwoc_status": "stopped",
   "cwoc_starttime": "",
   "cwoc_configstatus": "not configured",
   "version": "1.247347.5b250583"
}
```

* Spring Actuator Metric 수집
```xml
  dependencies {
     implementation("org.springframework.boot:spring-boot-starter-actuator")
     implementation("org.springframework.cloud:spring-cloud-starter-aws:2.2.1.RELEASE")
     implementation("io.micrometer:micrometer-registry-cloudwatch")
  }    
```
```xml
  cloud.aws.stack.auto=false  # 로컬에서 실행시 AWS stack autoconfiguration 수행과정에서 발생하는 에러 방지
  cloud.aws.region.static=ap-northeast-2
  management.metrics.export.cloudwatch.namespace=  # 해당 namespace로 Cloudwatch 메트릭을 조회 가능
  management.metrics.export.cloudwatch.batch-size=20
  management.endpoints.web.exposure.include=*
```