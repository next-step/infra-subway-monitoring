package nextstep.subway.common;

import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

import javax.servlet.http.HttpServletRequest;

/**
 * packageName : nextstep.subway.common
 * fileName : TimeTraceAspect
 * author : haedoang
 * date : 2021-12-13
 * description : 메소드의 수행 시간을 로깅한다.
 */
@Component
@Aspect
public class TimeTraceAspect {
    private static final Logger logger = LoggerFactory.getLogger("file");
    private HttpServletRequest request;

    public TimeTraceAspect(HttpServletRequest request) {
        this.request = request;
    }

    @Around("execution(* nextstep.subway..ui.*.*(..))")
    public Object controllerPointCut(ProceedingJoinPoint pjp) throws Throwable {
        StopWatch watch = new StopWatch();
        watch.start();
        logger.info("[↘︎][{}][{}][{}.{}]", request.getMethod(), request.getRequestURI(), getClassName(pjp), getMethodName(pjp));
        Object proceed = pjp.proceed();
        watch.stop();
        logger.info("[↖︎][{}][{}][{}.{}] {}ms.", request.getMethod(), request.getRequestURI(), getClassName(pjp), getMethodName(pjp), watch.getTotalTimeMillis());
        return proceed;
    }

    @Around("execution(* nextstep.subway..application.*.*(..))")
    public Object servicePointCut(ProceedingJoinPoint pjp) throws Throwable {
        StopWatch watch = new StopWatch();
        watch.start();
        logger.info("[  →][{}.{}]", getClassName(pjp), getMethodName(pjp));
        Object proceed = pjp.proceed();
        watch.stop();
        logger.info("[  ←][{}.{}] {}ms.", getClassName(pjp), getMethodName(pjp), watch.getTotalTimeMillis());
        return proceed;
    }

    private String getMethodName(ProceedingJoinPoint pjp) {
        return pjp.getSignature().getName();
    }

    private String getClassName(ProceedingJoinPoint pjp) {
        return StringUtils.substringAfterLast(pjp.getTarget().getClass().toString(), ".");
    }
}
