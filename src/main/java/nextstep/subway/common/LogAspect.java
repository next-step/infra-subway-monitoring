package nextstep.subway.common;

import java.util.UUID;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {

    private static final String TRACE_ID = "trace.id";
    private static final Logger logger = LoggerFactory.getLogger(LogAspect.class);

    @Pointcut("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public void controllerAdvice() {
    }

    @Around("controllerAdvice()")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        requestLogging(joinPoint);

        Object result;

        try {
            result = joinPoint.proceed(joinPoint.getArgs());
            responseLogging(result);
        } catch (Exception e) {
            logger.error("{} response error, {}", joinPoint.getSignature().getName(), e);
            throw e;
        } finally {
            MDC.clear();
        }

        return result;
    }

    public void requestLogging(JoinPoint joinPoint) {
        String traceId = UUID.randomUUID().toString();
        MDC.put(TRACE_ID, traceId);

        logger.info("{} request ", joinPoint.getSignature().getName());

        for (Object args : joinPoint.getArgs()) {
            logger.info("args: {}", args);
        }
    }

    public void responseLogging(Object result) {
        logger.info("response: {}", result);
    }
}
