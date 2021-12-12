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

    private final Logger fileLogger = LoggerFactory.getLogger("file");
    private final Logger jsonLogger = LoggerFactory.getLogger("json");

    @Around("@annotation(nextstep.subway.aop.ApiLoggingNoInfo)")
    public Object apiLoggingNoInfo(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String requestMethodName = getRequestMethodName(proceedingJoinPoint);

        fileLogger.info("{} - start", requestMethodName);
        ResponseEntity<?> responseEntity = (ResponseEntity<?>) proceedingJoinPoint.proceed();
        fileLogger.info("{} - finish", requestMethodName);

        return responseEntity;
    }

    @Around("@annotation(nextstep.subway.aop.ApiLoggingWithInfo)")
    public Object apiLoggingWithInfo(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String requestMethodName = getRequestMethodName(proceedingJoinPoint);

        fileLogger.info("{} - start : {}", requestMethodName, proceedingJoinPoint.getArgs());
        ResponseEntity<?> responseEntity = (ResponseEntity<?>) proceedingJoinPoint.proceed();
        fileLogger.info("{} - finish : {}", requestMethodName, responseEntity);

        return responseEntity;
    }

    @Around("@annotation(nextstep.subway.aop.ApiLoggingWithInfoJson)")
    public Object apiLoggingWithInfoJson(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String requestMethodName = getRequestMethodName(proceedingJoinPoint);

        jsonLogger.info("{} - start : {}", requestMethodName, proceedingJoinPoint.getArgs());
        ResponseEntity<?> responseEntity = (ResponseEntity<?>) proceedingJoinPoint.proceed();
        jsonLogger.info("{} - finish : {}", requestMethodName, responseEntity);

        return responseEntity;
    }

    private String getRequestMethodName(ProceedingJoinPoint proceedingJoinPoint) {
        return proceedingJoinPoint.getTarget().getClass().getSimpleName()
                + "." + proceedingJoinPoint.getSignature().getName();
    }
}
