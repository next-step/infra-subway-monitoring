package nextstep.subway.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class CudLoggingAop {
    private static final Logger log = LoggerFactory.getLogger("file");

    @Pointcut("@annotation(LoggingTarget)")
    private void cudCut() {
    }

    @Around("cudCut()")
    public Object logging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object result = null;

        String methodName = proceedingJoinPoint.getSignature().toShortString();
        log.info(String.valueOf(methodName));

        Object[] args = proceedingJoinPoint.getArgs();
        log.info(Arrays.toString(args));

        try {
            result = proceedingJoinPoint.proceed();
            log.info(String.valueOf(result));
        } catch (Exception e) {
            throw e;
        }
        return result;
    }
}
