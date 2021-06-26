package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LoggingConfig {
    private static final Logger fileLogger = LoggerFactory.getLogger(LoggingConfig.class);

    @Around("execution(* nextstep.subway..ui.*Controller.*(..)) || execution(* nextstep.subway..application.*Service.*(..))")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
        long startAt = System.currentTimeMillis();

        fileLogger.info("REQUEST : {} = params {}", joinPoint.getSignature().toShortString(),
                Arrays.toString(joinPoint.getArgs()));

        Object result = joinPoint.proceed(joinPoint.getArgs());

        long endAt = System.currentTimeMillis();

        fileLogger.info("RESPONSE : {} = {} ({}ms)", joinPoint.getSignature().toShortString(),
                result, endAt-startAt);

        return result;
    }
}
