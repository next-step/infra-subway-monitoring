package nextstep.subway.aspect;

import java.lang.reflect.Method;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {
    private static final Logger logger = LoggerFactory.getLogger(LogAspect.class);

    @Pointcut("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    private void cut(){}

    @Before("cut()")
    public void beforeParameterLog(JoinPoint joinPoint) {
        Method method = getMethod(joinPoint);
        logger.info("======= method name = {} =======", method.getName());

        Object[] args = joinPoint.getArgs();
        if (args.length <= 0) {
            logger.info("no parameter");
        }
        for (Object arg : args) {
            logger.info("parameter type = {}", arg.getClass().getSimpleName());
            logger.info("parameter value = {}", arg);
        }
    }

    @AfterReturning(value = "cut()", returning = "result")
    public void afterReturnLog(JoinPoint joinPoint, Object result) {
        // 메서드 정보 받아오기
        Method method = getMethod(joinPoint);
        logger.info("======= Method name = {} =======", method.getName());

        logger.info("return type = {}", result.getClass().getSimpleName());
        logger.info("return value = {}", result);
    }

    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }
}