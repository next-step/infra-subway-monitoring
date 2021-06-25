package nextstep.subway.common;

import java.util.Arrays;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggerAspect {

    private static final Logger log = LoggerFactory.getLogger("file");

    @Around("execution(* nextstep.subway.auth.application.AuthService.login(..))")
    public Object loginLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        return infoLogging(joinPoint);
    }

    @Around("execution(* nextstep.subway.member.application.MemberService.createMember(..))")
    public Object joinLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        return infoLogging(joinPoint);
    }

    @Around("execution(* nextstep.subway.map.application.MapService.findPath(..))")
    public Object findPathLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        return infoLogging(joinPoint);
    }

    private Object infoLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        String params = getRequestParams(joinPoint);

        log.info("{}({}) = REQUEST: {}", joinPoint.getSignature().getDeclaringTypeName(),
            joinPoint.getSignature().getName(), params);

        Object result = joinPoint.proceed();

        log.info("{}({}) = RESPONSE: {}", joinPoint.getSignature().getDeclaringTypeName(),
            joinPoint.getSignature().getName(), result);

        return result;
    }

    private String getRequestParams(ProceedingJoinPoint pjp) {
        return Arrays.toString(pjp.getArgs());
    }
}
