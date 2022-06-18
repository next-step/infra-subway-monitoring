package nextstep.subway.aspect;

import java.util.UUID;
import java.util.stream.IntStream;
import org.apache.commons.lang3.time.StopWatch;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
    private static final String TRACE_ID = "traceId";
    private static final String DOT = ".";
    private static final String BRACKET_OPEN_CLOSE = "()";

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        String invokePath = extractInvokePath(joinPoint);
        logBeforeProceed(joinPoint, invokePath);

        StopWatch stopWatch = StopWatch.createStarted();
        Object result;
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

        logger.info("# [before] trace id  : {}", traceId);
        logger.info("# [before] invoke Path  : {}", invokePath);
        IntStream.range(0, joinPoint.getArgs().length)
                .mapToObj(index -> String.format("# [before] RequestModel[%d] : %s", index, joinPoint.getArgs()[index]))
                .forEach(logger::info);
    }

    private void logAfterProceed(ProceedingJoinPoint joinPoint, Object result, String formatTime) {
        logger.info("# [after] Trace Id : {}", MDC.get(TRACE_ID));
        logger.info("# [after] Invoke : {}", extractInvokePath(joinPoint));

        if (result instanceof ResponseEntity) {
            HttpStatus httpStatus = ((ResponseEntity<?>) result).getStatusCode();
            logger.info("# [after] HttpStatus : {}", httpStatus);
            logger.info("# [after] ResponseEntity : {}", result);
        }

        logger.info("# [after] Running Time : {}", formatTime);
        MDC.clear();
    }

    private void logErrorByException(ProceedingJoinPoint joinPoint, Exception e, String formatTime) {
        logger.error("# [error] Trace Id : {}", MDC.get(TRACE_ID));
        logger.error("# [error] Invoke Path : {}", extractInvokePath(joinPoint));
        logger.error("# [error] Exception : {} - {}", e.getClass().getName(), e.getMessage());
        logger.error("# [error] Running Time : {}", formatTime);

        IntStream
                .range(0, joinPoint.getArgs().length)
                .mapToObj(index -> String.format("# [error] RequestModel[%d] : %s", index, joinPoint.getArgs()[index]))
                .forEach(logger::info);

        logger.error(e.getMessage(), e);
    }

    private String extractInvokePath(ProceedingJoinPoint joinPoint) {
        return joinPoint.getSignature().getDeclaringTypeName() + DOT + joinPoint.getSignature().getName() + BRACKET_OPEN_CLOSE;
    }
}
