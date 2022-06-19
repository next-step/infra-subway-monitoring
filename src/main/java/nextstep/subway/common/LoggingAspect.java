package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Around("@within(org.springframework.web.bind.annotation.RestController)")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        String signature = joinPoint.getSignature().toShortString();
        logger.info("Before Execution : {}", signature);
        logArgs(joinPoint);

        Object returnObject;
        try {
            returnObject = joinPoint.proceed();
            logger.info("After Execution : {}", signature);
            logReturnObject(returnObject);
        } catch (Exception e) {
            logger.error("Exception Occurred : {}", signature);
            logException(e);
            logArgs(joinPoint);
            throw e;
        }
        return returnObject;
    }

    private void logArgs(ProceedingJoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        for(int i=0; i<args.length ; i++){
            String arg = args[i] != null ?  args[i].toString() : "null";
            logger.info("Argument {} : {}", i, arg);
        }
    }

    private void logReturnObject(Object returnObject) {
        if (returnObject instanceof ResponseEntity) {
            ResponseEntity<?> responseEntity = (ResponseEntity<?>) returnObject;
            logger.info("Response Code : {}",responseEntity.getStatusCode().name());
            return;
        }
    }

    private void logException(Exception e) {
        logger.error(e.getClass().getName() + "-" + e.getMessage(), e);
    }
}
