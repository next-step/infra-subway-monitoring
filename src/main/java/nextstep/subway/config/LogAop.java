package nextstep.subway.config;

import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class LogAop {
    private static final Logger logger = LoggerFactory.getLogger("console");

    @Pointcut("execution(* nextstep.subway..ui.*.*(..))")
    private void cut() {}

    @Before("cut()")
    public void beforeLog(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        logger.info("[요청] {}, {}, {}, {}",
            request.getMethod(),
            request.getRequestURI(),
            joinPoint.getSignature().getDeclaringType().getSimpleName(),
            joinPoint.getArgs()
        );
    }

    @AfterReturning(value = "cut()", returning = "returnObj")
    public void afterLog(JoinPoint joinPoint, Object returnObj) {
        ResponseEntity response = (ResponseEntity) returnObj;

        logger.info("[응답] {} {}",
            response.getStatusCode(),
            response.getBody());
    }
}
