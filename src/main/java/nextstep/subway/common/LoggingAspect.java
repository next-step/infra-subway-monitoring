package nextstep.subway.common;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Aspect
@Component
public class LoggingAspect {
    public static final String SUBWAY_UI_CONTROLLER = "execution(public * nextstep.subway..ui.*Controller.*(..))";
    public final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    @Pointcut(SUBWAY_UI_CONTROLLER)
    public void controllerAdvice() {}


    @Before("controllerAdvice()")
    public void before(JoinPoint joinPoint) {
        MDC.put("trace.id", UUID.randomUUID().toString());
        log.info("[Request] - {}.{}() : {}", joinPoint.getTarget().getClass().getSimpleName(), joinPoint.getSignature().getName(), joinPoint.getArgs());
    }

    @AfterReturning(value = "controllerAdvice()", returning = "result")
    public void afterReturning(JoinPoint joinPoint, ResponseEntity<?> result) {
        log.info("[Response] - {}.{}() : {}", joinPoint.getTarget().getClass().getSimpleName(), joinPoint.getSignature().getName(), result.getBody());
        MDC.clear();
    }

    @AfterThrowing(value = "controllerAdvice()", throwing = "e")
    public void afterThrowing(JoinPoint joinPoint, Exception e) {
        log.info("[Exception] - {}.{}() : {}", joinPoint.getTarget().getClass().getSimpleName(), joinPoint.getSignature().getName(), ExceptionUtils.getStackTrace(e));
        MDC.clear();
    }
}
