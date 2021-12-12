package nextstep.subway.common;

import org.apache.commons.lang3.exception.ExceptionUtils;
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
    public static final String SUBWAY_UI_CONTROLLER = "execution(public * nextstep.subway..ui.*Controller.*(..))";
    public final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    @Before(SUBWAY_UI_CONTROLLER)
    public void before(JoinPoint joinPoint) {
        log.info("[Request] - {}.{}() : {}", joinPoint.getTarget().getClass().getSimpleName(), joinPoint.getSignature().getName(), joinPoint.getArgs());
    }

    @AfterReturning(value = SUBWAY_UI_CONTROLLER, returning = "result")
    public void afterReturning(JoinPoint joinPoint, ResponseEntity<?> result) {
        log.info("[Response] - {}.{}() : {}", joinPoint.getTarget().getClass().getSimpleName(), joinPoint.getSignature().getName(), result.getBody());
    }

    @AfterThrowing(value = SUBWAY_UI_CONTROLLER, throwing = "e")
    public void afterThrowing(JoinPoint joinPoint, Exception e) {
        log.info("[Exception] - {}.{}() : {}", joinPoint.getTarget().getClass().getSimpleName(), joinPoint.getSignature().getName(), ExceptionUtils.getStackTrace(e));
    }
}
