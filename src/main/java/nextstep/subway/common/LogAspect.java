package nextstep.subway.common;

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

    private static final String FILE_LOGGER_NAME = "file";
    private static final String JSON_LOGGER_NAME = "json";

    private final Logger fileLogger = LoggerFactory.getLogger(FILE_LOGGER_NAME);
    private final Logger jsonLogger = LoggerFactory.getLogger(JSON_LOGGER_NAME);

    @Around("execution(public * nextstep.subway..ui.*Controller.*(..)) && !@annotation(JsonLogging)")
    public Object logFile(final ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        return proceed(proceedingJoinPoint, fileLogger);
    }

    @Around("@annotation(JsonLogging)")
    public Object logJson(final ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        return proceed(proceedingJoinPoint, jsonLogger);
    }

    private Object proceed(
        final ProceedingJoinPoint proceedingJoinPoint,
        final Logger logger
    ) throws Throwable {
        final long startTime = System.currentTimeMillis();
        final String requestMethodName = proceedingJoinPoint.getTarget()
            .getClass()
            .getSimpleName()
            + "::"
            + proceedingJoinPoint.getSignature().getName();
        logger.info("Requested {} : {}", requestMethodName, proceedingJoinPoint.getArgs());
        ResponseEntity<?> responseEntity = (ResponseEntity<?>) proceedingJoinPoint.proceed();
        final long endTime = System.currentTimeMillis();
        final long x = endTime - startTime;
        logger.info("Responded {} in {} ms : {}", requestMethodName, x, responseEntity);
        return responseEntity;
    }
}
