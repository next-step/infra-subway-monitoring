```
ubuntu@ip-192-168-171-46:~/k6$ k6 run --out influxdb=http://localhost:8086/k6 stress.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: stress.js
     output: InfluxDBv1 (http://localhost:8086)

  scenarios: (100.00%) 1 scenario, 563 max VUs, 10m30s max duration (incl. graceful stop):
           * default: Up to 563 looping VUs for 10m0s over 10 stages (gracefulRampDown: 30s, gracefulStop: 30s)

WARN[0283] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.056332231s
WARN[0286] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.303570479s
WARN[0287] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.420444264s
WARN[0287] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.005196885s
WARN[0291] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.142914955s
WARN[0292] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.427835175s
WARN[0296] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.486548776s
WARN[0296] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.794244422s
WARN[0308] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.175527518s
WARN[0308] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.089980217s
WARN[0318] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.677150522s
WARN[0318] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.260674479s
WARN[0324] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.599658555s
WARN[0325] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.721375768s
WARN[0327] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.661821546s
WARN[0330] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.032815266s
WARN[0330] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=2.614522182s
WARN[0332] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.668311408s
WARN[0332] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.44387391s
WARN[0332] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=2.020660591s
WARN[0334] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.348179435s
WARN[0337] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.316890639s
WARN[0339] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.829938258s
WARN[0340] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.065269188s
WARN[0341] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.112170269s
WARN[0342] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.999069451s
WARN[0343] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.156196529s
WARN[0343] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0343] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0343] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0343] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0343] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0343] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0343] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0344] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0344] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0344] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0344] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0344] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0344] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0344] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.134218394s
WARN[0344] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:36746->13.209.177.16:443: read: connection reset by peer"
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0345] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0345] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0345] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0345] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0345] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0345] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0345] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0345] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0346] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.003648808s
WARN[0346] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0346] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0348] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.851860422s
WARN[0349] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0349] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0349] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0349] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0349] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0349] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0349] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0349] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0349] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0349] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.168482684s
WARN[0349] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0350] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0350] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0350] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0350] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0350] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0350] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0350] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0351] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0351] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0354] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0354] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0354] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0354] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0354] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0355] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0355] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0355] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0355] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.686502208s
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:58682->13.209.177.16:443: read: connection reset by peer"
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0355] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.673532375s
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0356] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0356] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0356] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0356] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0356] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0356] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0356] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0356] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0356] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0356] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0356] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0357] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0357] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0357] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0358] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0358] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0358] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0358] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0358] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0358] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0358] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0358] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0358] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0359] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0359] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0359] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0359] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0359] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0359] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0359] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0359] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0359] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0359] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0359] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0359] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0359] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.105803958s
WARN[0359] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0359] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0360] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0360] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0360] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0360] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0360] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0360] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0360] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0361] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0361] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0361] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0361] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0361] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0361] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0361] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0361] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0361] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0361] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.083208197s
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0362] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0362] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0362] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.036347301s
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:45328->13.209.177.16:443: read: connection reset by peer"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:45326->13.209.177.16:443: read: connection reset by peer"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:45280->13.209.177.16:443: read: connection reset by peer"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0363] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0363] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": read tcp 192.168.171.46:47464->13.209.177.16:443: read: connection reset by peer"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0364] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0364] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0364] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0364] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0364] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0364] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0365] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0365] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0364] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0365] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0365] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0366] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0366] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0366] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0367] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0367] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0367] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0367] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0367] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0367] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0367] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0367] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0367] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0367] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0368] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0367] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:53182->13.209.177.16:443: read: connection reset by peer"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0368] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0369] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:54900->13.209.177.16:443: read: connection reset by peer"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:54884->13.209.177.16:443: read: connection reset by peer"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0369] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//stations\": EOF"
ERRO[0369] TypeError: Cannot read property 'length' of undefined
running at selected Stations successfully (file:///home/ubuntu/k6/stress.js:59:54(3))
default at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:58:27(76)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0369] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0369] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0368] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0369] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0370] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0370] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0370] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0370] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0370] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0370] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0370] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0370] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0370] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0370] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0370] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0370] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0370] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0370] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0370] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0370] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:59386->13.209.177.16:443: read: connection reset by peer"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:59274->13.209.177.16:443: read: connection reset by peer"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:59424->13.209.177.16:443: read: connection reset by peer"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0371] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0371] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": read tcp 192.168.171.46:59534->13.209.177.16:443: read: connection reset by peer"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0371] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0371] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0372] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0372] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0372] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0372] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0372] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0373] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0373] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": EOF"
ERRO[0373] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0373] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0373] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0373] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0373] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0373] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0373] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0373] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0374] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": read tcp 192.168.171.46:36658->13.209.177.16:443: read: connection reset by peer"
ERRO[0374] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0374] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr//paths?source=9&target=6\": read tcp 192.168.171.46:36588->13.209.177.16:443: read: connection reset by peer"
ERRO[0374] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at found Path successfully (file:///home/ubuntu/k6/stress.js:71:47(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:70:27(119)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0374] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0374] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0374] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0375] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0375] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.257805368s
WARN[0376] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0376] Request Failed                                error="Post \"https://www.tasklet1579.p-e.kr//login/token\": EOF"
ERRO[0376] the body is null so we can't transform it to JSON - this likely was because of a request error getting the response
running at reflect.methodValueCall (native)
default at logged in successfully (file:///home/ubuntu/k6/stress.js:51:46(4))
        at go.k6.io/k6/js/modules/k6.(*K6).Check-fm (native)
        at file:///home/ubuntu/k6/stress.js:50:24(55)
        at native  executor=ramping-vus scenario=default source=stacktrace
WARN[0376] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0376] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0376] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0377] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.355973042s
WARN[0385] Request Failed                                error="Get \"https://www.tasklet1579.p-e.kr/\": EOF"
WARN[0393] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.229946763s
WARN[0393] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.272912896s
WARN[0398] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.116888823s
WARN[0400] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.139232414s
WARN[0404] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.050046418s
WARN[0408] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.142858255s
WARN[0409] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.683239622s
WARN[0410] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=2.258632192s
WARN[0414] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.617797066s
WARN[0417] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.024537849s
WARN[0420] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.395639333s
WARN[0441] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.050662082s
WARN[0442] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.000190888s
WARN[0476] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.253403626s
WARN[0527] The flush operation took higher than the expected set push interval. If you see this message multiple times then the setup or configuration need to be adjusted to achieve a sustainable rate.  output=InfluxDBv1 t=1.087775471s

running (10m01.0s), 000/563 VUs, 53968 complete and 0 interrupted iterations
default ✓ [======================================] 000/563 VUs  10m0s

     ✗ lending page running
      ↳  99% — ✓ 53555 / ✗ 413
     ✗ logged in successfully
      ↳  99% — ✓ 53849 / ✗ 119
     ✗ selected Stations successfully
      ↳  99% — ✓ 53805 / ✗ 44
     ✗ found Path successfully
      ↳  99% — ✓ 53497 / ✗ 308

     checks.........................: 99.58% ✓ 214706     ✗ 884
     data_received..................: 238 MB 396 kB/s
     data_sent......................: 38 MB  63 kB/s
     http_req_blocked...............: avg=42.25ms  min=0s    med=3.87µs  max=2.09s    p(90)=8.67µs   p(95)=406.61µs
     http_req_connecting............: avg=7.83ms   min=0s    med=0s      max=1.02s    p(90)=0s       p(95)=0s
   ✗ http_req_duration..............: avg=153.84ms min=0s    med=68.52ms max=3.04s    p(90)=367.56ms p(95)=481.67ms
       { expected_response:true }...: avg=160.2ms  min=1ms   med=68.99ms max=3.04s    p(90)=375.26ms p(95)=497.28ms
     http_req_failed................: 25.38% ✓ 54733      ✗ 160857
     http_req_receiving.............: avg=1.72ms   min=0s    med=47.19µs max=710.91ms p(90)=282.72µs p(95)=1.46ms
     http_req_sending...............: avg=26.34ms  min=0s    med=17.77µs max=2.79s    p(90)=678.11µs p(95)=41.87ms
     http_req_tls_handshaking.......: avg=17.83ms  min=0s    med=0s      max=1.61s    p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=125.76ms min=0s    med=66.23ms max=2.04s    p(90)=337.78ms p(95)=416.86ms
     http_reqs......................: 215590 358.730948/s
     iteration_duration.............: avg=1.84s    min=1.02s med=1.35s   max=8.53s    p(90)=3.6s     p(95)=4.36s
     iterations.....................: 53968  89.800046/s
     vus............................: 1      min=0        max=563
     vus_max........................: 563    min=391      max=563

ERRO[0603] some thresholds have failed
```
