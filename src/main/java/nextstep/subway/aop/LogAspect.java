package nextstep.subway.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Around("execution(public * nextstep.subway..ui.*Controller.*(..))")
    public Object controllerLogging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String requestMethodName = proceedingJoinPoint.getTarget().getClass().getSimpleName()
                + "." + proceedingJoinPoint.getSignature().getName();

        logger.info("{} - start : {}", requestMethodName, proceedingJoinPoint.getArgs());
        ResponseEntity<?> responseEntity = (ResponseEntity<?>) proceedingJoinPoint.proceed();
        logger.info("{} - finish : {}", requestMethodName, responseEntity);

        return responseEntity;
    }
}
