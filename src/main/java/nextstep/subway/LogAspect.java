package nextstep.subway;

import java.util.Arrays;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Profile("dev")
public class LogAspect {
    @Around("execution(* nextstep.subway.*.application.*Service.*(..))")
    public Object log(final ProceedingJoinPoint joinPoint) throws Throwable {
        final Logger logger = LoggerFactory.getLogger(joinPoint.getTarget().getClass());
        logger.debug("{} started. args : {}", joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));

        final Object result = joinPoint.proceed();

        logger.debug("{} ended. return : {}", joinPoint.getSignature().getName(), result);

        return result;
    }
}
