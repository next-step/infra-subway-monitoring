package nextstep.subway.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("local")
@Aspect
public class MethodTraceAspect {
    private static final Logger console = LoggerFactory.getLogger("console");

    @Around("execution(* nextstep.subway..*(..))")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
        console.trace("method = {}, arg = {}", joinPoint.getSignature().toShortString(), joinPoint.getArgs());
        Object object = joinPoint.proceed();
        console.trace("return = {}", object);
        return object;
    }
}
