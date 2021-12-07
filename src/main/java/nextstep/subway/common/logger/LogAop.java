package nextstep.subway.common.logger;


import javax.servlet.http.HttpServletRequest;
import nextstep.subway.common.LogTimer;
import nextstep.subway.common.RequestUtils;
import nextstep.subway.common.TraceId;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Aspect
@Component
public class LogAop {

    private static final Logger logger = LoggerFactory.getLogger(LogAop.class);

    @Pointcut("within(nextstep.subway.*.ui.*)")
    public void controller() {
    }

    @Around("nextstep.subway.common.logger.LogAop.controller()")
    private Object controller(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = RequestUtils.request();
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        try {
            logger.debug("=======================================================");
            logger.debug("REQUEST_URI: {}", request.getRequestURI());
            logger.debug("METHOD_NAME: {}", request.getMethod());
            logger.debug("PARAMETER: {}", RequestUtils.toParam(request));
            logger.debug("TRACE_ID: {}", TraceId.of());
            logger.debug("=======================================================");
            Object proceed = joinPoint.proceed(joinPoint.getArgs());
            stopWatch.stop();
            return proceed;
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw e;
        } finally {
            logger.debug(stopWatch.prettyPrint());
        }
    }
}
