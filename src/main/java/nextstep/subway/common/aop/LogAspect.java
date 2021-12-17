package nextstep.subway.common.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Aspect
public class LogAspect {

    private static final Logger logger = LoggerFactory.getLogger(LogAspect.class);

    @Pointcut("execution(* nextstep.subway..*Service.*(..))")
    private static void advicePoint() {

    }

    @Before("advicePoint()")
    public void logBefore(JoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        for (Object arg : joinPoint.getArgs()) {
            int sequence = 1;
            logger.info("[CommonLog][Before] Method [{}], parameter [{}] as [{}]", methodSignature.getName(), sequence, arg.toString());
            sequence++;
        }
    }

    @After(value="advicePoint()")
    public void logAfter(JoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        for(Object arg : joinPoint.getArgs()) {
            int sequence = 1;
            logger.info("[CommonLog][After] Method [{}], parameter [{}] as [{}]", methodSignature.getName(), sequence, arg.toString());
            sequence++;
        }
    }
}
