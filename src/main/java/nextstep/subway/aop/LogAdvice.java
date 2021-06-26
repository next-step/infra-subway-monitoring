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

    @Around("@annotation(nextstep.subway.aop.ApiLog)")
    public Object log(ProceedingJoinPoint joinPoint) throws Throwable {
        fileLogger.info("{}", joinPoint.getSignature().toString());
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            fileLogger.info("{}", arg.toString());
        }
        Object proceed = joinPoint.proceed();
        fileLogger.info("{}, {}", joinPoint.getSignature().getName(), proceed);
        return proceed;
    }
}
