package nextstep.subway.log;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAdvice {

    private static final Logger logger = LoggerFactory.getLogger("console");

    @Pointcut("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public void advicePoint(){}

    @Before("advicePoint()")
    public void logBefore(JoinPoint joinPoint) {
        logger.info("method {} {}", joinPoint.getSignature().getName(), "실행");
        logger.info("argument : {}", joinPoint.getArgs());
    }

    @After("advicePoint()")
    public void logAfter(JoinPoint joinPoint) {
        logger.info("method {} {}", joinPoint.getSignature().getName(), "성공");
    }

}
