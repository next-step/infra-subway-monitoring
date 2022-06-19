package nextstep.subway.aop;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAop {
    private static final Logger log = LoggerFactory.getLogger("file");

    private final HttpServletRequest request;

    public LogAop(HttpServletRequest request) {
        this.request = request;
    }

    @Pointcut("execution(* nextstep.subway.*.ui.*Controller.*(..)) && @annotation(Logging)")
    private void cut() {}

    @Around("cut()")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result;
        Method method = getMethod(joinPoint);
        int requestId = request.hashCode();
        loggingParameter(joinPoint, method.getName(), requestId);

        try {
            result = joinPoint.proceed();
            loggingResponse(result, method.getName(), requestId);
        } catch (Exception e) {
            throw e;
        }

        return result;
    }

    @AfterThrowing(value = "cut()", throwing = "ex")
    public void exceptionLogging(Throwable ex) {
        log.error("exception : {}", ex.getMessage());
    }

    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }

    private void loggingParameter(ProceedingJoinPoint joinPoint, String methodName, int requestId) {
        RequestLogVO requestLogVO = RequestLogVO.of(requestId, joinPoint.getTarget(), joinPoint.getArgs(), methodName);
        log.info(requestLogVO.toString());
    }

    private void loggingResponse(Object result, String methodName, int requestId) {
        if (Objects.nonNull(result)) {
            ResponseEntity<?> response = (ResponseEntity<?>) result;
            ResponseLogVO responseLogVO = ResponseLogVO.of(requestId, response.getStatusCodeValue(), response.getBody(), methodName);
            log.info(responseLogVO.toString());
        }
    }
}
