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
        loggingBefore(joinPoint);
        StopWatch stopWatch = StopWatch.createStarted();
        Object returnObject = null;
        try {
            returnObject = joinPoint.proceed();
            stopWatch.stop();
            loggingAfter(joinPoint, returnObject, stopWatch.formatTime());
        } catch (Exception e) {
            stopWatch.stop();
            loggingError(joinPoint, e, stopWatch.formatTime());
        }
        return returnObject;
    }

    private void loggingError(ProceedingJoinPoint joinPoint, Exception e, String formatTime) {
        logger.error("[END] Trace Id : {}", MDC.get(TRACE_ID));
        logger.error("[END] Invoke : {}", makeInvokePath(joinPoint));
        logger.error("[END] Exception : {} - {}", e.getClass().getName(), e.getMessage());
        logger.error("[END] Running Time : {}", formatTime);
    }

    private void loggingBefore(ProceedingJoinPoint joinPoint) {
        String traceId = UUID.randomUUID().toString();
        MDC.put(TRACE_ID, traceId);
        logger.info("[START] Trace Id  : {}", traceId);
        IntStream
            .range(0, joinPoint.getArgs().length)
            .mapToObj(index -> String.format("[START] Arguments[%d] : %s", index, joinPoint.getArgs()[index]))
            .forEach(logger::debug);
    }

    private void loggingAfter(ProceedingJoinPoint joinPoint, Object returnObject, String formatTime) {
        logger.info("[END] Trace Id : {}", MDC.get(TRACE_ID));
        logger.info("[END] Invoke : {}", makeInvokePath(joinPoint));
        if (returnObject instanceof ResponseEntity) {
            HttpStatus httpStatus = ((ResponseEntity<?>) returnObject).getStatusCode();
            logger.info("[END] httpStatus : {}", httpStatus);
            logger.debug("[END] httpStatus : {}", returnObject);
        }
        logger.info("[END] Running Time : {}", formatTime);
        MDC.clear();
    }

    private String makeInvokePath(ProceedingJoinPoint joinPoint) {
        return joinPoint.getSignature().getDeclaringTypeName() + "." + joinPoint.getSignature().getName() + "()";
    }
}
