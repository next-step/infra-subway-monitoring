- 경쟁사와 시간 비교

  - 메인 페이지 (모바일)
    - subway :
      - 성능 : 30점
      - FCP : 15.1s
      - TTI : 15.7s
      - LCP : 15.6s
    - 서울교통공사 :
      - 성능 : 33점
      - FCP : 7.2s
      - TTI : 10.9s
      - LCP : 12.8s
    - 네이버지도 :
      - 성능 : 57점
      - FCP : 2.2s
      - TTI : 6.5s
      - LCP : 8.2s
    - 카카오맵 :
      - 성능 : 74점
      - FCP : 1.7s
      - TTI : 4.2s
      - LCP : 4.7s
  - 메인 페이지 (PC)

    - subway :
      - 성능 : 67점
      - FCP : 2.7s
      - TTI : 2.8s
      - LCP : 2.8s
    - 서울교통공사 :
      - 성능 : 63점
      - FCP : 1.7s
      - TTI : 2.2s
      - LCP : 4.0s
    - 네이버지도 :
      - 성능 : 87점
      - FCP : 0.5s
      - TTI : 0.7s
      - LCP : 1.7s
    - 카카오맵 :
      - 성능 : 92점
      - FCP : 0.5s
      - TTI : 0.7s
      - LCP : 1.1s

  - 역관리 (모바일)
    - 성능 : 15점
    - FCP : 16.3s
    - TTI : 23.9s
    - LCP : 16.3s
  - 역관리 (PC)

    - 성능 : 30점
    - FCP : 3.0s
    - TTI : 5.3s
    - LCP : 3.0s

  - 노선관리 (모바일)
    - 성능 : 9점
    - FCP : 16.4s
    - TTI : 18.5s
    - LCP : 16.5s
  - 노선관리 (PC)

    - 성능 : 46점
    - FCP : 3.0s
    - TTI : 3.5s
    - LCP : 3.0s

  - 구관관리 (모바일)
    - 성능 : 46점
    - FCP : 16.3s
    - TTI : 16.6s
    - LCP : 16.3s
  - 구관관리 (PC)

    - 성능 : 65점
    - FCP : 3.0s
    - TTI : 3.0s
    - LCP : 2.9s

  - 경로검색 (모바일)
    - 성능 : 41점
    - FCP : 16.5s
    - TTI : 172.s
    - LCP : 16.5s
  - 경로검색 (PC)

    - 성능 : 65점
    - FCP : 3.0s
    - TTI : 3.2s
    - LCP : 3.0s

  - 로그인 (모바일)

    - 성능 : 46점
    - FCP : 16.5s
    - TTI : 16.4s
    - LCP : 16.4s

  - 로그인 (PC)
    - 성능 : 65점
    - FCP : 2.9s
    - TTI : 2.9s
    - LCP : 2.9s

---
- 경쟁사 '네이버'와 '카카오'를 기준으로 성능 예산 측정 (according to PageSpeed)
  - Quantity based Metric :
    - 카카오, 네이버 측정 후 잡아보자.
  - Timing based Metric :
    - mobile : 
      - FCP : <= 2s
      - TTI : <= 5s
      - LCP : <= 5s
    - pc :
      - FCP : <= 0.5s
      - TTI : <= 0.7s
      - LCP : <= 1.4s

  - Rule based Metric :
    - mobile : >= score 60
    - pc : >= score 90