package nextstep.subway.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Aspect
public class LogAdvice {
    private static final Logger fileLogger = LoggerFactory.getLogger("api");

    @Around("@annotation(nextstep.subway.aop.FileLogging)")
    public Object fileLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        Object proceed = joinPoint.proceed();
        fileLogger.info("{}, {}, {}", joinPoint.getSignature().getName(), Arrays.asList(joinPoint.getArgs()), proceed);
        return proceed;
    }
}