package nextstep.subway.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");
    private static final Logger consoleLogger = LoggerFactory.getLogger("console");
    private static final String PROFILE_LOCAL = "local";
    private static final String PROFILE_TEST = "test";

    @Value("${spring.profiles.active:}")
    private String activeProfile;

    @Pointcut("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    private void allControllerMethods() {
    }

    @Before("allControllerMethods()")
    public void before(JoinPoint joinPoint) {
        if (activeProfile.equals(PROFILE_LOCAL) || activeProfile.equals(PROFILE_TEST)) {
            consoleLogger.info("[REQUEST] {}({}) args: {}",
                joinPoint.getTarget().getClass().getSimpleName(),
                joinPoint.getSignature().getName(),
                joinPoint.getArgs());
        }

        jsonLogger.info("[REQUEST] {}({}) args: {}",
            joinPoint.getTarget().getClass().getSimpleName(),
            joinPoint.getSignature().getName(),
            joinPoint.getArgs());
    }

    @AfterReturning(value = "allControllerMethods()", returning = "response")
    public void afterReturning(JoinPoint joinPoint, ResponseEntity<?> response) {
        if (activeProfile.equals(PROFILE_LOCAL) || activeProfile.equals(PROFILE_TEST)) {
            consoleLogger.info("[RESPONSE] {}({}) args: {}",
                joinPoint.getTarget().getClass().getSimpleName(),
                joinPoint.getSignature().getName(),
                response.getBody());
        }

        jsonLogger.info("[RESPONSE] {}({}) args: {}",
            joinPoint.getTarget().getClass().getSimpleName(),
            joinPoint.getSignature().getName(),
            response.getBody());
    }

    @AfterThrowing(value = "allControllerMethods()", throwing = "exception")
    public void afterThrowing(JoinPoint joinPoint, Exception exception) {
        if (activeProfile.equals(PROFILE_LOCAL) || activeProfile.equals(PROFILE_TEST)) {
            consoleLogger.error("[ERROR] {}({}) message: {}",
                joinPoint.getTarget().getClass().getSimpleName(),
                joinPoint.getSignature().getName(),
                exception.getMessage());
        }

        fileLogger.error("[ERROR] {}({}) message: {}",
            joinPoint.getTarget().getClass().getSimpleName(),
            joinPoint.getSignature().getName(),
            exception.getMessage());
    }
}
