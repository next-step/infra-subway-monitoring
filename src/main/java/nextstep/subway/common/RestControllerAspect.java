package nextstep.subway.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

@Component
@Aspect
public class RestControllerAspect {
    @Before("@within(org.springframework.web.bind.annotation.RestController)")
    public void requestLogging(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        ControllerLogger.requestLog(request, joinPoint);
    }

    @AfterReturning(value = "@within(org.springframework.web.bind.annotation.RestController)")
    public void responseLogging(JoinPoint joinPoint) {
        HttpServletResponse response = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getResponse();
        ControllerLogger.responseLog(response, joinPoint);
    }

    @AfterThrowing(value = "@within(org.springframework.web.bind.annotation.RestController)", throwing = "throwable")
    public void responseErrorLogging(JoinPoint joinPoint, Throwable throwable) {
        HttpServletResponse response = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getResponse();
        ControllerLogger.responseErrorLog(response, joinPoint, throwable);
    }
}
