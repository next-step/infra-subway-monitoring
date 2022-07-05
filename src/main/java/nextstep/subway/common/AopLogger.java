package nextstep.subway.common;

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

//@Profile({"prod"})
@Aspect
@Component
public class AopLogger {
    private static final Logger logger = LoggerFactory.getLogger("file");

    @Pointcut("execution(* nextstep.subway.*.ui..*.*(..))")
    private void controller() {
    }

    @Before("controller()")
    public void before(JoinPoint joinPoint) {
        logger.info("Request From: {}",
                joinPoint.getSignature().getDeclaringType().getSimpleName() + ":" + joinPoint.getSignature().getName());
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        logger.info("Request URI: {}", request.getRequestURI());

        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            logger.info("Parameter Value = {}", arg);
        }
    }

    @AfterReturning(value = "controller()", returning = "returnObject")
    public void after(JoinPoint joinPoint, Object returnObject) {
        logger.info("Response From: {}",
                joinPoint.getSignature().getDeclaringType().getSimpleName() + ":" + joinPoint.getSignature().getName());
        ResponseEntity response = (ResponseEntity) returnObject;
        logger.info("Response: {}", response);
        if (response.getBody() != null) {
            logger.info("Response Body = {}", ((ResponseEntity) returnObject).getBody());
        }
    }
}
