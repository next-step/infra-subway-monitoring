package nextstep.subway.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    @Pointcut("execution(* nextstep.subway.*.ui.*Controller.*(..)) && @annotation(Logging)")
    private void controllerPointcut() {
    }

    @Before("controllerPointcut()")
    public void before(JoinPoint joinPoint) {
        log.info("[Request] Class({}), Method({}), arguments: {}",
                joinPoint.getTarget().getClass().getSimpleName(),
                joinPoint.getSignature().getName(),
                joinPoint.getArgs());
    }

    @AfterReturning(value = "controllerPointcut()", returning = "response")
    public void after(JoinPoint joinPoint, ResponseEntity<?> response) {
        log.info("[Response] Class: {}, Method: {}, arguments: {}",
                joinPoint.getTarget().getClass().getSimpleName(),
                joinPoint.getSignature().getName(),
                response.getBody());
    }

    @AfterThrowing(pointcut = "controllerPointcut()", throwing = "e")
    public void throwing(JoinPoint joinPoint, Exception e) {
        log.error("[Error] Class: {}, Method: {}, Error: {}, Message : {}",
                joinPoint.getTarget().getClass().getSimpleName(),
                joinPoint.getSignature().getName(),
                e.getClass(),
                e.getMessage());
    }
}
