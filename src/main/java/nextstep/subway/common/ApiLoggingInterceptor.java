package nextstep.subway.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static net.logstash.logback.argument.StructuredArguments.kv;

public class ApiLoggingInterceptor implements HandlerInterceptor {
    private final static Logger jsonLogger = LoggerFactory.getLogger("json");

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        jsonLogger.info("{}, {}, {}, {}",
                kv("method", request.getMethod()),
                kv("request uri", request.getRequestURI()),
                kv("Context-Type",request.getContextPath()),
                kv("Response status", HttpStatus.valueOf(response.getStatus())));
    }
}
