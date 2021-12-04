package nextstep.subway.common;

import java.util.UUID;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Aspect
@Component
public class LoggingAspect {

    private static final String REQUEST_ID = "requestId";
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");

    @Around("execution(* nextstep.subway.*.ui.*.*(..)) && @annotation(Logging)")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        logBefore(joinPoint);
        StopWatch watch = new StopWatch();
        Object result = null;
        try {
            watch.start();
            result = joinPoint.proceed();
            watch.stop();
            logResult(result, watch.getTotalTimeMillis());
        } catch (Exception e) {
            watch.stop();
            logError(joinPoint, e, watch.getTotalTimeMillis());
        }
        MDC.clear();
        return result;
    }

    private void logResult(Object result, long totalTimeMillis) {
        String requestId = MDC.get(REQUEST_ID);
        jsonLogger.info("Requested Id {} End (Time: {}ms)", requestId, totalTimeMillis);
        jsonLogger.info("Requested Id: {} / Response: {}", requestId, result);
    }

    private void logBefore(JoinPoint joinPoint) {
        String requestId = newRequestId();
        MDC.put(REQUEST_ID, requestId);
        jsonLogger.info("Requested Id {} Start", requestId);
        jsonLogger.info("Requested Id: ({}) / Invoked Method: {}::{}", requestId,
            joinPoint.getSignature().getDeclaringTypeName(),
            joinPoint.getSignature().getName()
        );

        Object[] args = joinPoint.getArgs();
        for (int i = 0; i < args.length; i++) {
            jsonLogger.info("Requested Id: ({}) / Arguments[{}]: {}", requestId, i, args[i]);
        }
    }

    private void logError(ProceedingJoinPoint joinPoint, Exception e, long totalTimeMillis) {
        String requestId = MDC.get(REQUEST_ID);
        jsonLogger.error("Requested Id {} Error (Time: {}ms)", requestId, totalTimeMillis);
        jsonLogger.error("Requested Id: {} / Invoked Method: {}::{} / Occurred Error: {}.{}",
            requestId,
            joinPoint.getSignature().getDeclaringTypeName(),
            joinPoint.getSignature().getName(),
            e.getClass().getName(),
            e.getMessage());
    }

    private String newRequestId() {
        return UUID.randomUUID().toString();
    }
}
