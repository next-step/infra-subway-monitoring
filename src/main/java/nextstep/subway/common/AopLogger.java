package nextstep.subway.common;

import java.lang.reflect.Method;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile({"prod"})
@Aspect
@Component
public class AopLogger {
    private static final Logger logger = LoggerFactory.getLogger("file");

    @Pointcut("execution(* nextstep.subway.*.ui..*.*(..))")
    private void controller() {
    }

    @Before("controller()")
    public void before(JoinPoint joinPoint) {
        Method method = getMethod(joinPoint);
        logger.info("Method Name: {}", method.getName());

        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            logger.info("Parameter Type = {}", arg.getClass().getSimpleName());
            logger.info("Parameter Value = {}", arg);
        }
    }

    @AfterReturning(value = "controller()", returning = "returnObject")
    public void after(JoinPoint joinPoint, Object returnObject) {
        Method method = getMethod(joinPoint);
        logger.info("Method Name: {}", method.getName());
        logger.info("Return Type = {}", returnObject.getClass().getSimpleName());
        logger.info("Return Value = {}", returnObject);
    }

    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }
}
