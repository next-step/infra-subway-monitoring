FROM openjdk:8-jdk-alpine
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ARG SPRING_PROFILES_ACTIVE=local
ENV ENVIRONMENT=${SPRING_PROFILES_ACTIVE}
ENTRYPOINT ["java","-jar","-DSpring.profiles.active=${ENVIRONMENT}","/app.jar"]
