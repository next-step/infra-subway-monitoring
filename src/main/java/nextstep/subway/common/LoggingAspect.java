package nextstep.subway.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final String CONTROLLER_PUBLIC_METHOD = "execution(public * nextstep.subway..ui.*Controller.*(..))";
    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    @Before(CONTROLLER_PUBLIC_METHOD)
    public void loggingBefore(JoinPoint joinPoint) {
        log.info("{}.{}() 요청: {}", joinPoint.getTarget().getClass().getSimpleName(), joinPoint.getSignature().getName(), joinPoint.getArgs());
    }

    @AfterReturning(value = CONTROLLER_PUBLIC_METHOD, returning = "returnObject")
    public void loggingAfterReturning(JoinPoint joinPoint, ResponseEntity<?> returnObject) {
        log.info("{}.{}() 응답: {}", joinPoint.getTarget().getClass().getSimpleName(), joinPoint.getSignature().getName(), returnObject.getBody());
    }

    @AfterThrowing(value = CONTROLLER_PUBLIC_METHOD, throwing = "e")
    public void loggingAfterThrowing(JoinPoint joinPoint, Exception e) {
        log.info("{}.{}() 예외: {}", joinPoint.getTarget().getClass().getSimpleName(), joinPoint.getSignature().getName(), e.toString());
    }
}
