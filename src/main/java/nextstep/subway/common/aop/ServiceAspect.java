package nextstep.subway.common.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@Aspect
@Component
public class ServiceAspect {
    private static final Logger log = LoggerFactory.getLogger("file");

    @Pointcut("execution(* nextstep.subway..*.application.*Service.*(..) )")
    public void serviceAdvice() {
    }

    @AfterThrowing(pointcut = "serviceAdvice()", throwing = "e")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable e) {
        log.error("Exception in {}.{}() with cause = \'{}\' and exception = \'{}\'", joinPoint.getSignature().getDeclaringTypeName(),
                  joinPoint.getSignature().getName(), e.getCause() != null ? e.getCause() : "NULL", e.getMessage(), e);
    }

    @Before("serviceAdvice()")
    public void requestLogging(JoinPoint joinPoint) {
        log.debug("[" + joinPoint.getSignature().toShortString() + "] -------------------------- Service START --------------------------");
        log.debug("[" + joinPoint.getSignature().toShortString() + "] Service Parameters: " + Arrays.toString(joinPoint.getArgs()));
    }

    @AfterReturning(pointcut = "serviceAdvice()", returning = "result")
    public void requestLogging(JoinPoint joinPoint, Object result) {
        log.debug("[" + joinPoint.getSignature().toShortString() + "] -------------------------- Service FINISH --------------------------");
    }

    @AfterReturning(pointcut = "serviceAdvice()", returning = "result")
    public void afterReturning(JoinPoint joinPoint, Object result) {
        if (result instanceof Collection) {
            result = ((Collection) result).stream().limit(100).collect(Collectors.toList());
        }

        log.debug("[" + joinPoint.getSignature().toShortString() + "] Service Returned: " + result);
        log.debug("[" + joinPoint.getSignature().toShortString() + "] -------------------------- Service FINISH --------------------------");
    }
}
