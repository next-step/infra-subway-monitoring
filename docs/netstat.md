서버가 응답이 자꾸 늦어져요

종종 서버의 응답이 늦어질때 요청이 서버에 엄청 몰리는게 문제인지 알고 싶을때가 있다. 이때엔 네트워크 연결수로 확인해볼수 있다.

```
ubuntu@ip-192-168-171-46:~/infra-subway-monitoring$ sudo netstat -nap | grep ESTAB | wc
2      18     202
ubuntu@ip-192-168-171-46:~/infra-subway-monitoring$ sudo netstat -nap | grep TIME_WAIT | wc
0       0       0

---

ubuntu@ip-192-168-171-46:~/infra-subway-monitoring$ sudo netstat -nap | grep ESTAB | wc
212    1490   21412
ubuntu@ip-192-168-171-46:~/infra-subway-monitoring$ sudo netstat -nap | grep TIME_WAIT | wc
11363   79541 1147663
```

연결수가 지나치게 많다면 어디선가 자꾸 연결이 생성되고 있다고 보면된다. 요청이 외부에서 들어온다면 몰리는 것이고 아니라면 뭔가 서버에 이상이 있는 것이다.

```
$ netstat -nap | grep TIME_WAIT | wc
```

TIME_WAIT 수가 비정상적으로 많으면 들어오는 요청을 서버에서 제대로 처리를 못하고 있다고 보면된다. 한마디로 병목현상이 벌어지고 있는 것이다.

출처 : [Linux 서버 장애원인 파악은 어떻게?](https://blog.hbsmith.io/linux-%EC%84%9C%EB%B2%84-%EC%9E%A5%EC%95%A0%EC%9B%90%EC%9D%B8-%ED%8C%8C%EC%95%85%EC%9D%80-%EC%96%B4%EB%96%BB%EA%B2%8C-7accec423bb5)
