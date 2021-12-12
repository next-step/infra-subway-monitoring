package nextstep.subway.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    @Pointcut("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    private void allControllerMethods() {
    }

    @Before("allControllerMethods()")
    public void before(JoinPoint joinPoint) {
        log.info("[REQUEST] {}({}) args: {}",
            joinPoint.getTarget().getClass().getSimpleName(),
            joinPoint.getSignature().getName(),
            joinPoint.getArgs());
    }

    @AfterReturning(value = "allControllerMethods()", returning = "response")
    public void afterReturning(JoinPoint joinPoint, ResponseEntity<?> response) {
        log.info("[RESPONSE] {}({}) args: {}",
            joinPoint.getTarget().getClass().getSimpleName(),
            joinPoint.getSignature().getName(),
            response.getBody());
    }

    @AfterThrowing(value = "allControllerMethods()", throwing = "exception")
    public void afterThrowing(JoinPoint joinPoint, Exception exception) {
        log.error("[ERROR] {}({}) message: {}",
            joinPoint.getTarget().getClass().getSimpleName(),
            joinPoint.getSignature().getName(),
            exception.getMessage());
    }
}
