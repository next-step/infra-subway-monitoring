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
public class LogAopConfig {
    private final static Logger logger = LoggerFactory.getLogger(LogAopConfig.class);

    @Around("execution(* nextstep.subway.auth.application.AuthService.*(..))")
    public Object logAuth(ProceedingJoinPoint joinPoint) throws Throwable {
        return this.logging(joinPoint);
    }

    @Around("execution(* nextstep.subway.line.ui.LineController.*(..))")
    public Object logLine(ProceedingJoinPoint joinPoint) throws Throwable {
        return this.logging(joinPoint);
    }

    @Around("execution(* nextstep.subway.member.ui.MemberController.*(..))")
    public Object logMember(ProceedingJoinPoint joinPoint) throws Throwable {
        return this.logging(joinPoint);
    }

    private Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return joinPoint.proceed();
        }finally {
            long end = System.currentTimeMillis();
            logger.info("{} {} {} ({}ms)",
                    joinPoint.getSignature().getDeclaringType(),
                    joinPoint.getSignature().getName(),
                    Arrays.toString(joinPoint.getArgs()),
                    (end-start));
        }
    }
}
