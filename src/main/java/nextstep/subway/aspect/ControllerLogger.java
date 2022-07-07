package nextstep.subway.aspect;

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

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
public class ControllerLogger {

    private static final Logger logger = LoggerFactory.getLogger(ControllerLogger.class);

    @Pointcut("execution(* nextstep.subway..ui.*.*(..))")
    public void controllerPointcut() {
    }

    @Before("nextstep.subway.aspect.ControllerLogger.controllerPointcut()")
    public void beforeLogging(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        logger.info("Request: {} {}", request.getMethod(), request.getRequestURI());

        Object[] args = joinPoint.getArgs();

        for(Object arg : args) {
            logger.debug("Parameter: {}", arg.toString());
        }
    }

    @AfterReturning(value = "nextstep.subway.aspect.ControllerLogger.controllerPointcut()", returning = "returnObj")
    public void afterLogging(JoinPoint joinPoint, Object returnObj) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        if (returnObj instanceof ResponseEntity) {
            ResponseEntity response = (ResponseEntity) returnObj;

            logger.info("Request: {} {} - Response Http Status Code: {}", request.getMethod(),
                    request.getRequestURI(), response.getStatusCodeValue());
        }
    }
}
