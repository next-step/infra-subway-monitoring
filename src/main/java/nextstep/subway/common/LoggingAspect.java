package nextstep.subway.common;

import java.util.UUID;
import java.util.stream.IntStream;

import org.apache.commons.lang3.time.StopWatch;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.jboss.logging.MDC;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
    private static final String TRACE_ID = "traceId";

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        String invokePath = extractInvokePath(joinPoint);
        logBeforeProceed(joinPoint, invokePath);

        StopWatch stopWatch = StopWatch.createStarted();
        Object result = null;

        try {
            result = joinPoint.proceed();

            stopWatch.stop();
            logAfterProceed(joinPoint, result, stopWatch.formatTime());
        } catch (Exception e) {
            stopWatch.stop();
            logErrorByException(joinPoint, e, stopWatch.formatTime());

            throw e;
        }

        return result;
    }

    private void logBeforeProceed(ProceedingJoinPoint joinPoint, String invokePath) {
        String traceId = UUID.randomUUID().toString();
        MDC.put(TRACE_ID, traceId);

        logger.info("[START] Trace Id  : {}", traceId);
        logger.info("[START] Invoke Path  : {}", invokePath);
        IntStream
            .range(0, joinPoint.getArgs().length)
            .mapToObj(index -> String.format("[START] RequestModel[%d] : %s", index, joinPoint.getArgs()[index]))
            .forEach(logger::info);
    }

    private void logAfterProceed(ProceedingJoinPoint joinPoint, Object result, String formatTime) {
        logger.info("[END] Trace Id : {}", MDC.get(TRACE_ID));
        logger.info("[END] Invoke : {}", extractInvokePath(joinPoint));

        if (result instanceof ResponseEntity) {
            HttpStatus httpStatus = ((ResponseEntity<?>) result).getStatusCode();
            logger.info("[END] HttpStatus : {}", httpStatus);
            logger.info("[END] ResponseEntity : {}", result);
        }

        logger.info("[END] Running Time : {}", formatTime);
        MDC.clear();
    }

    private void logErrorByException(ProceedingJoinPoint joinPoint, Exception e, String formatTime) {
        logger.error("[END: ERROR] Trace Id : {}", MDC.get(TRACE_ID));
        logger.error("[END: ERROR] Invoke Path : {}", extractInvokePath(joinPoint));
        logger.error("[END: ERROR] Exception : {} - {}", e.getClass().getName(), e.getMessage());
        logger.error("[END: ERROR] Running Time : {}", formatTime);

        IntStream
            .range(0, joinPoint.getArgs().length)
            .mapToObj(index -> String.format("[END: ERROR] RequestModel[%d] : %s", index, joinPoint.getArgs()[index]))
            .forEach(logger::info);

        logger.error(e.getMessage(), e);
    }

    private String extractInvokePath(ProceedingJoinPoint joinPoint) {
        return joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName() + "()";
    }
}
