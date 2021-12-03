FROM openjdk:8-jdk-alpine
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY fullchain.pem /etc/letsencrypt/live/nhs0912-subway-infra.kro.kr/fullchain.pem
COPY privkey.pem /etc/letsencrypt/live/nhs0912-subway-infra.kro.kr/privkey.pem
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
