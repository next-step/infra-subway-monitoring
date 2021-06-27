package nextstep.subway.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LogAdvice {
    private static final Logger fileLogger = LoggerFactory.getLogger("api");
    private static final Logger pathLogger = LoggerFactory.getLogger("path");

    @Around("@annotation(nextstep.subway.aop.FileLogging)")
    public Object fileLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        fileLogger.info("{}, {}, {}", "RequestParam", joinPoint.getSignature().getName(), joinPoint.getArgs()[0]);
        Object proceed = joinPoint.proceed();
        fileLogger.info("{}", proceed);
        return proceed;
    }

    @Around("@annotation(nextstep.subway.aop.PathLogging)")
    public Object pathLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        pathLogger.info("{}, {}, {}", joinPoint.getSignature().getName(), joinPoint.getArgs()[1], joinPoint.getArgs()[2]);
        Object proceed = joinPoint.proceed();
        pathLogger.info("{}", proceed);
        return proceed;
    }
}