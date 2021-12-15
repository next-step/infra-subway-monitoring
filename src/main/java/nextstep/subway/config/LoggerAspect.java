package nextstep.subway.config;

import java.util.Arrays;
import java.util.UUID;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggerAspect {

    private static final String TRACE_ID = "traceId";
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");
    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final String LOG_FORMAT = "[{}] [{}] [{}] [{}] : Request: {}";


    @Pointcut("execution(* nextstep.subway.map.application.MapService.findPath(..))")
    private void findPath() {
    }

    @Before("findPath()")
    public void beforeMapPointCut(JoinPoint joinPoint) {
        putTraceId();
        beforeLogging(joinPoint, jsonLogger);
    }

    @AfterReturning(value = "findPath()", returning = "retVal")
    public void afterMapPointCut(JoinPoint joinPoint, Object retVal) {
        MDC.put("result",retVal.toString());
        MDC.put("args",Arrays.toString(joinPoint.getArgs()));
        afterLogging(joinPoint, retVal, jsonLogger);
    }

    @Around("@annotation(nextstep.subway.config.LoggingAop)")
    public Object logInOutAopLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        putTraceId();
        beforeLogging(joinPoint, fileLogger);
        Object result = joinPoint.proceed();
        afterLogging(joinPoint, result, fileLogger);
        return result;
    }

    private void beforeLogging(JoinPoint joinPoint, Logger logger) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        logger.info(LOG_FORMAT,MDC.get(TRACE_ID), "beforeLogging", className, methodName, args);
    }

    private void afterLogging(JoinPoint joinPoint, Object retVal, Logger logger) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        logger.info(LOG_FORMAT,MDC.get(TRACE_ID), "afterLogging", className, methodName, retVal);
    }

    private void putTraceId() {
        String traceId = UUID.randomUUID().toString().substring(0, 8);
        MDC.put(TRACE_ID, traceId);
    }
}
