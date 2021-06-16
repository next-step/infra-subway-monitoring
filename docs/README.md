# 서비스 진단하기
## 1단계 - 로깅과 모니터링
### 요구사항
- [x] 애플리케이션 진단하기 실습을 진행해보고 문제가 되는 코드를 수정
- [x] 로그 설정하기
    - [x] Application Log 파일로 저장하기
        * 회원가입, 로그인, 최단거리 조회 등의 이벤트에 로깅을 설정
    - [x] Nginx Access Log 설정하기
        * docker run command : docker run -d -p 80:80 -p 443:443 -v /var/log/nginx:/var/log/nginx --name proxy enemfk777/reverse-proxy:0.0.2
        * docker cAdvisor run command : docker run \
          --volume=/:/rootfs:ro \
          --volume=/var/run:/var/run:ro \
          --volume=/sys:/sys:ro \
          --volume=/var/lib/docker/:/var/lib/docker:ro \
          --volume=/dev/disk/:/dev/disk:ro \
          --publish=8080:8080 \
          --detach=true \
          --name=cadvisor \
          google/cadvisor:latest
- [x] Cloudwatch로 모니터링
  - [x] Cloudwatch로 로그 수집하기
    * **nginx instacne** /var/awslogs/etc/awslogs.conf
      ```shell
        [/var/log/syslog]
        datetime_format = %b %d %H:%M:%S
        file = /var/log/syslog
        buffer_duration = 5000
        log_stream_name = {instance_id}
        initial_position = start_of_file
        log_group_name = enemfk777-syslog
        
        [/var/log/nginx/access.log]
        datetime_format = %d/%b/%Y:%H:%M:%S %z
        file = /var/log/nginx/access.log
        buffer_duration = 5000
        log_stream_name = access.log
        initial_position = end_of_file
        log_group_name = enemfk777-accesslog
        
        [/var/log/nginx/error.log]
        datetime_format = %Y/%m/%d %H:%M:%S
        file = /var/log/nginx/error.log
        buffer_duration = 5000
        log_stream_name = error.log
        initial_position = end_of_file
        log_group_name = enemfk777-errorlog
        ```
  - [x] Cloudwatch로 메트릭 수집하기
    * **nginx instance** /opt/aws/amazon-cloudwatch-agent/bin/config.json
    ```json
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
    * **subway app instace** prod profile
    ```properties
    cloud.aws.stack.auto=false 
    cloud.aws.region.static=ap-northeast-2
    management.metrics.export.cloudwatch.namespace=enemfk777-app-subway
    management.metrics.export.cloudwatch.batch-size=20
    management.endpoints.web.exposure.include=*
    ```

### 요구사항 설명
**운영 환경 구성하기**
* [저장소](https://github.com/next-step/infra-subway-monitoring) 를 활용하여 아래 요구사항을 해결합니다.
* README 에 있는 질문에 답을 추가한 후 PR을 보내고 리뷰요청을 합니다.


