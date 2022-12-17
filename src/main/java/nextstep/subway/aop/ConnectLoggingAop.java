package nextstep.subway.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

import static net.logstash.logback.argument.StructuredArguments.kv;

@Aspect
@Component
public class ConnectLoggingAop {
    private static final Logger log = LoggerFactory.getLogger("json");

    private final HttpServletRequest request;

    public ConnectLoggingAop(HttpServletRequest request) {
        this.request = request;
    }

    @Pointcut("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    private void connectCut() {
    }

    @Around("connectCut()")
    public Object logging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object result;
        try {
            requestLogging(request);
            result = proceedingJoinPoint.proceed();
            responseLogging(result);
        } catch (Exception exception) {
            errorLogging(exception);
            throw exception;
        }
        return result;
    }

    private void errorLogging(Exception exception) {
        log.error("exception Logging : {}", exception.getMessage());
    }

    private void responseLogging(Object result) {
        ResponseEntity<?> response = (ResponseEntity<?>) result;
        log.info("Response : {},{},{}",
                kv("Response Headers", response.getHeaders()),
                kv("Response StatusCode", response.getStatusCode()),
                kv("Response StatusCodeValue", response.getStatusCodeValue())
        );
    }

    private void requestLogging(HttpServletRequest request) {
        log.info("request : {},{}",
                kv("Request URI", request.getRequestURI()),
                kv("Request Host", request.getRemoteHost())
        );
    }
}
