package nextstep.subway.config;

import java.util.Arrays;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggerAspect {

    private static final Logger jsonLogger = LoggerFactory.getLogger("json");
    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final String LOG_FORMAT = "[{}] [{}] [{}] : Request: {}";


    @Pointcut("execution(* nextstep.subway.map.application.MapService.findPath(..))")
    private void findPath() {
    }

    @Before("findPath()")
    public void beforeMapPointCut(JoinPoint joinPoint) {
        beforeLogging(joinPoint, fileLogger);
    }

    @AfterReturning(value = "findPath()", returning = "retVal")
    public void afterMapPointCut(JoinPoint joinPoint, Object retVal) {
        afterLogging(joinPoint, retVal, fileLogger);
    }

    @Around("@annotation(nextstep.subway.config.LoggingAop)")
    public Object logInOutAopLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        beforeLogging(joinPoint, jsonLogger);
        Object result = joinPoint.proceed();
        afterLogging(joinPoint, result, jsonLogger);

        return result;
    }

    private void beforeLogging(JoinPoint joinPoint, Logger logger) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        logger.info(LOG_FORMAT, "beforeLogging", className, methodName, Arrays.toString(args));
    }

    private void afterLogging(JoinPoint joinPoint, Object retVal, Logger logger) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        logger.info(LOG_FORMAT, "afterLogging", className, methodName, retVal);
    }

}
