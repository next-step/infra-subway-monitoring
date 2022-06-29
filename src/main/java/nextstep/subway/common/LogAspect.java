package nextstep.subway.common;

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
import org.springframework.util.StopWatch;

@Aspect
@Component
public class LogAspect {
    private static final Logger logger = LoggerFactory.getLogger("console");

    @Pointcut("execution(* nextstep.subway.*..*Service.*(..))")
    public void allPointcut() {}

    @Before("allPointcut()")
    public void beforeLog(JoinPoint joinPoint) {
        String className = joinPoint.getSignature().getDeclaringTypeName();
        String method = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();

        logger.info("{} : {} start", className, method);

        if (args.length <= 0) {
            logger.info("no parameter");
        }
        for (Object arg : args) {
            logger.info("parameter value = {}", arg);
        }
    }

    @AfterReturning(value = "allPointcut()", returning = "returnObj")
    public void afterLog(JoinPoint joinPoint, Object returnObj) {
        String className = joinPoint.getSignature().getDeclaringTypeName();
        String method = joinPoint.getSignature().getName();

        logger.info("{} : {} ended", className, method);
        logger.debug("return value = {}", returnObj);
    }

    @Around("allPointcut()")
    public Object stopWatch(ProceedingJoinPoint pjp) throws Throwable {
        StopWatch stopWatch = new StopWatch();

        try {
            stopWatch.start();
            return pjp.proceed(pjp.getArgs());
        } finally {
            stopWatch.stop();
            logger.info("request spent {}ms", stopWatch.getLastTaskTimeMillis());
        }
    }
}
