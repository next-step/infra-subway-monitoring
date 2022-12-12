package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LogAspect {

    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public Object fileLog(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();

        String className = signature.getDeclaringTypeName();
        String methodName = signature.getName();

        Object result = joinPoint.proceed();

        fileLogger.info("Request {}.{}", className, methodName);
        fileLogger.info("Response {}.{} - result : {}", className, methodName, joinPoint.proceed());

        return result;
    }

}
