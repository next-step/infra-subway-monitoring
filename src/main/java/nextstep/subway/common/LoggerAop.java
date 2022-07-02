package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
public class LoggerAop {
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    @Around("within(nextstep.subway.*.ui..*)")
    public Object apiProcessLog(ProceedingJoinPoint pjp) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        Object proceedReturnValue = null;
        long startTime = System.currentTimeMillis();
        try {
            proceedReturnValue = pjp.proceed();
        } finally {
            fileLogger.info("API Request URI: '{}'  RUNNING TIME: '{}ms'", request.getRequestURI(), delayTime(startTime));
        }
        return proceedReturnValue;
    }

    private long delayTime(long startTime) {
        return System.currentTimeMillis() - startTime;
    }
}
