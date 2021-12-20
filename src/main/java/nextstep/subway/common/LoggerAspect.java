package nextstep.subway.common;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggerAspect {
    @Autowired(required = false)
    private HttpServletRequest request;

    private static Logger json = LoggerFactory.getLogger("json");

    @Around("execution(* nextstep.subway..ui.*Controller.*(..))")
    public Object aroundApi(ProceedingJoinPoint joinPoint) throws Throwable {
        UUID requestId = UUID.randomUUID();

        logBefore(requestId, request.getMethod(), request.getRequestURI(), joinPoint.getArgs());

        long start = System.currentTimeMillis();
        Object result = joinPoint.proceed();
        long end = System.currentTimeMillis();
        logAfter(requestId, result, end - start);
        return result;
    }

    private void logBefore(UUID requestId, String method, String resource, Object[] args) {
        json.info("request of - [{}], api - [{} {}]", requestId, method, resource);
        for (Object arg : args) {
            json.info("parameter about - [{}], arg - [{}]", requestId, dtoToString(arg));
        }
    }

    private void logAfter(UUID requestId, Object result, long execTime) {
        json.info("response about - [{}], exec time - [{}],  arg - [{}]", requestId, execTime, dtoToString(result));
    }

    private String dtoToString(Object arg) {
        if (arg.getClass().isAnnotationPresent(PersonalData.class)) {
            return "personal data";
        }
        return arg.toString();
    }
}
