FROM openjdk:8-jdk-alpine

ARG JAR_FILE=build/libs/subway-*.jar

COPY ${JAR_FILE} /app/infra-subway/subway-app.jar

ARG SPRING_PROFILES_ACTIVE
RUN echo $SPRING_PROFILES_ACTIVE
ENV SPRING_PROFILES_ACTIVE=$SPRING_PROFILES_ACTIVE

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/infra-subway/subway-app.jar"]
