package nextstep.subway.common.aspect;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Aspect
@Component
public class LoggingAspect {
    private final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Around("@annotation(nextstep.subway.common.annotation.ElapsedTime)")
    public Object logElapsedTime(ProceedingJoinPoint pjp) throws Throwable {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        Object result = pjp.proceed();

        stopWatch.stop();

        if (logger.isInfoEnabled()) {
            logger.info("[{}] Elapsed Time: {} ms", pjp.getSignature().toShortString(), stopWatch.getTotalTimeMillis());
        }

        return result;
    }

    @After("@annotation(org.springframework.web.bind.annotation.ExceptionHandler)")
    public void logException(JoinPoint joinPoint) {
        logger.error("[{}] Exception occurred. {}", joinPoint.getSignature().toShortString(), getArgs(joinPoint));
    }

    private String getArgs(JoinPoint joinPoint) {
        return Arrays.stream(joinPoint.getArgs())
            .map(Object::toString)
            .collect(Collectors.joining());
    }
}
