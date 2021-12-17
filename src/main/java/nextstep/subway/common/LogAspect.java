package nextstep.subway.common;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

import static net.logstash.logback.argument.StructuredArguments.keyValue;

@Aspect
@Component
public class LogAspect {

    private static final Logger jsonLogger = LoggerFactory.getLogger("json");
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Around("execution(* nextstep.subway..ui.*Controller.*(..)) || execution(* nextstep.subway..application.*Service.*(..))")
    public Object jsonLogger(ProceedingJoinPoint proceedingJoinPoint) {
      	HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        Object result = null;
        try {
            before(request);

            StopWatch stopWatch = new StopWatch();
            stopWatch.start();
            result = proceedingJoinPoint.proceed();
            stopWatch.stop();

            after(request, stopWatch);
        } catch (Throwable throwable) {
            error(request, throwable);
        }
        return result;
    }

    private void before(HttpServletRequest request) throws JsonProcessingException {
        jsonLogger.info("{}, {}",
                keyValue("request", request.getRequestURI()),
                keyValue("parameters", objectMapper.writeValueAsString(request.getParameterMap()))
        );
    }

    private void after(HttpServletRequest request, StopWatch stopWatch) throws JsonProcessingException {
        jsonLogger.info("{}, {}, {}",
                keyValue("request", request.getRequestURI()),
                keyValue("parameters", objectMapper.writeValueAsString(request.getParameterMap())),
                keyValue("performanceTime", stopWatch.getTotalTimeMillis())
        );
    }

    private void error(HttpServletRequest request, Throwable throwable) {
        jsonLogger.error("{}, {}",
                keyValue("request", request.getRequestURI()),
                keyValue("error", throwable.getMessage())
        );
    }

}
