package nextstep.subway.common;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


@Aspect
@Component
public class LoggerAspect {
    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");
    private static final ObjectMapper mapper = new ObjectMapper();

    @Around("!within(nextstep.subway.auth.ui.AuthenticationPrincipalArgumentResolver) && within(nextstep.subway.*.ui..*) && !@annotation(JsonLogging) && !@annotation(NoLogging)")
    public Object logging(ProceedingJoinPoint pjp) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        long start = System.currentTimeMillis();

        fileLogger.info("Request: {} {}: parameter: {}", request.getMethod(), request.getRequestURL(), mapper.writeValueAsString(request.getParameterMap()));

        if (request.getInputStream().available() > 0) {
            fileLogger.info("Request: {} {}: bodyContent: {}", request.getMethod(), request.getRequestURL(), mapper.writeValueAsString(request.getInputStream()));
        }

        Object result = pjp.proceed();

        long end = System.currentTimeMillis();

        fileLogger.info("Response: {} {}: {} ({}ms)", request.getMethod(), request.getRequestURL(), mapper.writeValueAsString(result), end - start);

        return result;
    }

    @Around("within(nextstep.subway.*.ui..*) && @annotation(JsonLogging)")
    public Object jsonLogging(ProceedingJoinPoint pjp) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        long start = System.currentTimeMillis();

        fileLogger.info("Request: {} {}: parameter: {}", request.getMethod(), request.getRequestURL(), mapper.writeValueAsString(request.getParameterMap()));

        if (request.getInputStream().available() > 0) {
            fileLogger.info("Request: {} {}: bodyContent: {}", request.getMethod(), request.getRequestURL(), mapper.writeValueAsString(request.getInputStream()));
        }

        Object result = pjp.proceed();

        long end = System.currentTimeMillis();

        jsonLogger.info("Response: {} {}: {} ({}ms)", request.getMethod(), request.getRequestURL(), mapper.writeValueAsString(result), end - start);

        return result;
    }
}
