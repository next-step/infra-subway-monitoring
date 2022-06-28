package nextstep.subway.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogConfig {
    private static final Logger logger = LoggerFactory.getLogger("console");

    @Pointcut("execution(* nextstep.subway.*..*Service.*(..))")
    public void allPointcut() {}

    @Before("allPointcut()")
    public void beforeLog(JoinPoint joinPoint) {
        String className = joinPoint.getSignature().getDeclaringTypeName();
        String method = joinPoint.getSignature().getName();

        logger.info("{} : {} start", className, method);
    }

    @After("allPointcut()")
    public void afterLog(JoinPoint joinPoint) {
        String className = joinPoint.getSignature().getDeclaringTypeName();
        String method = joinPoint.getSignature().getName();

        logger.info("{} : {} ended", className, method);
    }
}
