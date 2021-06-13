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
import java.util.Arrays;

@Component
@Aspect
public class RequestLoggingAspect {
    private final static Logger log = LoggerFactory.getLogger(RequestLoggingAspect.class);

    @Around("within(nextstep.subway.favorite.ui..*)")
    public Object calculatePerformanceFavorite(ProceedingJoinPoint joinPoint) throws Throwable {
        return getObject(joinPoint);
    }

    @Around("within(nextstep.subway.line.ui..*)")
    public Object calculatePerformanceLine(ProceedingJoinPoint joinPoint) throws Throwable {
        return getObject(joinPoint);
    }
    @Around("within(nextstep.subway.map.ui..*)")
    public Object calculatePerformanceMap(ProceedingJoinPoint joinPoint) throws Throwable {
        return getObject(joinPoint);
    }

    @Around("within(nextstep.subway.member.ui..*)")
    public Object calculatePerformanceMember(ProceedingJoinPoint joinPoint) throws Throwable {
        return getObject(joinPoint);
    }

    @Around("within(nextstep.subway.station.ui..*)")
    public Object calculatePerformanceStation(ProceedingJoinPoint joinPoint) throws Throwable {
        return getObject(joinPoint);
    }

    private Object getObject(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        long start = System.currentTimeMillis();
        try {
            return joinPoint.proceed(joinPoint.getArgs());
        } finally {
            long end = System.currentTimeMillis();
            log.info("Request: {} {} {} ({}ms)", request.getMethod(), request.getRequestURI(), Arrays.toString(joinPoint.getArgs()), (end - start));
        }
    }

}