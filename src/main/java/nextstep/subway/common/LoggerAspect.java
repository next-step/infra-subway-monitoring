package nextstep.subway.common;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
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
        requestInfoLog(joinPoint);
        Object result = joinPoint.proceed();
        responseDebugLog(joinPoint, result);

        return result;
    }

    @Around("execution(* nextstep.subway.member.application.MemberService.createMember(..))")
    public Object joinLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        requestInfoLog(joinPoint);
        Object result = joinPoint.proceed();
        responseInfoLog(joinPoint, result);
        
        return result;
    }

    @Around("execution(* nextstep.subway.map.application.MapService.findPath(..))")
    public Object findPathLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        requestInfoLog(joinPoint);
        Object result = joinPoint.proceed();
        responseInfoLog(joinPoint, result);
        
        return result;
    }

    private void requestInfoLog(JoinPoint joinPoint) {
        String params = getRequestParams(joinPoint);

        log.info("{}({}): REQUEST = {}", joinPoint.getSignature().getDeclaringTypeName(),
            joinPoint.getSignature().getName(), params);
    }

    private void responseInfoLog(JoinPoint joinPoint, Object result) {
        log.info("{}({}): RESPONSE = {}", joinPoint.getSignature().getDeclaringTypeName(),
            joinPoint.getSignature().getName(), result);
    }

    private void responseDebugLog(JoinPoint joinPoint, Object result) {
        log.debug("{}({}): RESPONSE = {}", joinPoint.getSignature().getDeclaringTypeName(),
            joinPoint.getSignature().getName(), result);
    }

    private String getRequestParams(JoinPoint joinPoint) {
        return Arrays.toString(joinPoint.getArgs());
    }
}
