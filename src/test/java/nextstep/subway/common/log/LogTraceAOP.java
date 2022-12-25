package nextstep.subway.common.log;

import static nextstep.subway.common.log.LogNameConstants.APPLICATION_LOG;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LogTraceAOP {
    private final Logger logger = LoggerFactory.getLogger(APPLICATION_LOG);

    @Around("execution(* nextstep.subway..*.application..*(..)) ")
    public Object applicationLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        logger.info("start {} {}", getClassName(joinPoint), getMethodName(joinPoint));

        for (Object arg : joinPoint.getArgs()) {
            logger.info("input : {}", arg);
        }

        Object result = joinPoint.proceed();

        if(result != null){
            logger.info("output : {}", result);
        }

        logger.info("end {} {}", getClassName(joinPoint), getMethodName(joinPoint));
        return result;
    }

    private String getMethodName(ProceedingJoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        return methodSignature.getName();
    }

    private String getClassName(ProceedingJoinPoint joinPoint) {
        return joinPoint.getTarget().getClass().getSimpleName();
    }
}
