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
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    @Around("@annotation(MemberLog)")
    public Object log(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();
        fileLogger.info("{}, {}", joinPoint.getSignature().getName(), args[0]);
        Object proceed = joinPoint.proceed();
        fileLogger.info("{}, {}", joinPoint.getSignature().getName(), proceed);
        return proceed;
    }
}
