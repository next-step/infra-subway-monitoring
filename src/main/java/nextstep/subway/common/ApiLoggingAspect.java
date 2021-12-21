package nextstep.subway.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Aspect
@Component
public class ApiLoggingAspect {
    private static final Logger logger = LoggerFactory.getLogger(ApiLoggingAspect.class);
    private static final String CONTROLLER = "execution(public * nextstep.subway..ui.*Controller.*(..))";

    @Before(value = CONTROLLER)
    public void request(JoinPoint joinPoint) {
        Method method = getMethod(joinPoint);
        logger.info("*** Method Name : {}", method.getName());

        Object[] parameters = joinPoint.getArgs();
        for (Object parameter : parameters) {
            logger.info("parameter type : {}", parameter.getClass().getName());
            logger.info("parameter value : {}", parameter);
        }
    }

    @AfterReturning(value = CONTROLLER, returning = "response")
    public void response(JoinPoint joinPoint, Object response) {
        Method method = getMethod(joinPoint);
        logger.info("*** Method Name : {}", method.getName());

        logger.info("return type :{}", response.getClass().getName());
        logger.info("return value :{}", response);
    }

    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }

}
