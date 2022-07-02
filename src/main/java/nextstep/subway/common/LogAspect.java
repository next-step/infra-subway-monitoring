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
public class LogAspect {
    private static final Logger log = LoggerFactory.getLogger(LogAspect.class);

    @Around("execution(* nextstep.subway.*.application.*.*(..))")
    public Object logging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {

        String params = Arrays.toString(proceedingJoinPoint.getArgs());

        log.info("시작: {}({})", proceedingJoinPoint.getSignature().getName(), params);

        long startAt = System.currentTimeMillis();
        Object result = proceedingJoinPoint.proceed();
        long endAt = System.currentTimeMillis();

        log.info("종료: {}({}) = {} ({}ms)", proceedingJoinPoint.getSignature().getName(), params, result,
                endAt - startAt);

        return result;
    }
}
