package nextstep.subway.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingConfig {
    private final Logger logger = LoggerFactory.getLogger(getClass());
    private final String CONTROLLER = "execution(public * nextstep.subway..ui.*Controller.*(..))";

    @Pointcut(CONTROLLER)
    private void controllerTarget() {

    }

    @Before("controllerTarget()")
    public void request(JoinPoint joinPoint) {
        logger.info("{}, {} => Request: {}",
                joinPoint.getTarget().getClass(),
                joinPoint.getSignature().getName(),
                joinPoint.getArgs());
    }

    @AfterReturning(value = "controllerTarget()", returning = "responseEntity")
    public void response(JoinPoint joinPoint, ResponseEntity responseEntity) {
        logger.info("{}.{} => Response [{}]: {} "
                , joinPoint.getTarget().getClass()
                , joinPoint.getSignature().getName()
                , responseEntity.getStatusCodeValue()
                , responseEntity.getBody());
    }

    @AfterThrowing(value = "controllerTarget()", throwing = "exception")
    public void exceptionLog(JoinPoint joinPoint, Exception exception){
        logger.error("{}.{} => Exception: {} "
                , joinPoint.getSignature().getName()
                , joinPoint.getArgs()
                , exception.getStackTrace());
    }

}
