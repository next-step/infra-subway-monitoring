package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {

    private static final Logger jsonLogger = LoggerFactory.getLogger("json");
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    @Around("execution(* nextstep.subway..ui.*Controller.*(..)) && !@annotation(JsonLogging)")
    public Object defaultLogger(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        return executeAop(proceedingJoinPoint, fileLogger);
    }

    @Around("@annotation(JsonLogging)")
    public Object jsonLogger(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        return executeAop(proceedingJoinPoint, jsonLogger);
    }

    private Object executeAop(ProceedingJoinPoint proceedingJoinPoint, Logger fileLogger) throws Throwable {
        before(proceedingJoinPoint, fileLogger);
        Object result = null;

        try {
            result = proceedingJoinPoint.proceed();
            afterReturning(proceedingJoinPoint, fileLogger);
        } catch (Exception e) {
            error(proceedingJoinPoint, fileLogger, e);
            result = proceedingJoinPoint.proceed();

        }
        return result;
    }

    private void before(ProceedingJoinPoint proceedingJoinPoint, Logger logger) {
        logger.info("type: {}, Method: {}, parameters: {}",
                proceedingJoinPoint.getSignature().getDeclaringType(),
                proceedingJoinPoint.getSignature().getName(),
                proceedingJoinPoint.getArgs());
    }

    private void afterReturning(ProceedingJoinPoint proceedingJoinPoint, Logger logger) {
        logger.info("type: {}, Method: {}, parameters: {}",
                proceedingJoinPoint.getSignature().getDeclaringType(),
                proceedingJoinPoint.getSignature().getName(),
                proceedingJoinPoint.getArgs());
    }

    private void error(ProceedingJoinPoint proceedingJoinPoint, Logger logger, Exception e) {
        logger.error("type: {}, Method: {}, Error: {}, Message : {}",
                proceedingJoinPoint.getSignature().getDeclaringType(),
                proceedingJoinPoint.getSignature().getName(),
                e.getClass(),
                e.getMessage());
    }
}
