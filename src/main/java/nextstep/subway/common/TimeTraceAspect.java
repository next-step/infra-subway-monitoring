package nextstep.subway.common;

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
    public void controllerPointCut(ProceedingJoinPoint pjp) throws Throwable {
        StopWatch watch = new StopWatch();
        logger.info(request.getRequestURI() + "invoke");
        watch.start();
        pjp.proceed();
        watch.stop();;
        logger.info(request.getRequestURI() + "done" + watch.getTotalTimeMillis() + "left");
    }
}
