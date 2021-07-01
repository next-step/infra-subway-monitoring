package nextstep.subway.logback;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LogAopHandler {
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    @Around("@annotation(nextstep.subway.logback.LogInOutFileAop)")
    public Object annotationInOutFileLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        beforeInfo(joinPoint, fileLogger);

        Object result = joinPoint.proceed();

        afterInfo(joinPoint, result, fileLogger);

        return result;
    }

    private void beforeInfo(JoinPoint joinPoint, Logger logger) {
        String method = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        logger.info("[{}] [{}]\t:\tRequest: {}", joinPoint.getSignature().getDeclaringTypeName(),
                method, Arrays.toString(args));
    }

    private void afterInfo(JoinPoint joinPoint, Object result, Logger logger) {
        if (result instanceof ResponseEntity) {
            String method = joinPoint.getSignature().getName();
            logger.info("[{}] [{}]\t:\tResponse: {}", joinPoint.getSignature().getDeclaringTypeName(),
                    method, result);
        }
    }

}
