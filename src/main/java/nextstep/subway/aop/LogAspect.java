package nextstep.subway.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {

    private final Logger fileLogger = LoggerFactory.getLogger("file");
    private final Logger jsonLogger = LoggerFactory.getLogger("json");

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public Object logging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String methodName = extractMethod(proceedingJoinPoint);
        fileLogger.info("{} - start", methodName);
        for (Object arg : proceedingJoinPoint.getArgs()) {
            fileLogger.info("{} - argument", arg);
        }
        return proceedingJoinPoint.proceed();
    }

    @Around("@annotation(nextstep.subway.aop.LoggingJson)")
    public Object apiLoggingNoInfo(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String methodName = extractMethod(proceedingJoinPoint);
        jsonLogger.info("{} - start", methodName);
        ResponseEntity<?> responseEntity = (ResponseEntity<?>) proceedingJoinPoint.proceed();
        jsonLogger.info("{} - finish", methodName);
        return responseEntity;
    }

    private String extractMethod(ProceedingJoinPoint proceedingJoinPoint) {
        return proceedingJoinPoint.getTarget().getClass().getSimpleName() + "." + proceedingJoinPoint.getSignature().getName();
    }
}
