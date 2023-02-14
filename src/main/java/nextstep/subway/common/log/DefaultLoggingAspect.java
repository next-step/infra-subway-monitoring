package nextstep.subway.common.log;


import java.lang.reflect.Method;
import java.util.UUID;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class DefaultLoggingAspect {
    private static final Logger log = LoggerFactory.getLogger(LogConstant.DEFAULT_LOGGER_NAME);

    @Pointcut("execution(* nextstep.subway..*Controller.*(..))")
    public void loggable() {

    }

    @Before("loggable()")
    public void requestLogging(JoinPoint joinPoint) {
        MDC.put(LogConstant.TRACING_ID, UUID.randomUUID().toString());
        Object[] args = joinPoint.getArgs();
        String param = getParams(args);

        log.debug("[REQUEST] :: {} :: PARAMS :: {}", getMethodName(joinPoint), param);
    }

    @AfterReturning(value = "loggable()", returning = "returnValue")
    public void responseLogging(JoinPoint joinPoint, Object returnValue) {
        if (returnValue != null) {
            log.debug("[RESPONSE] :: {} :: RESULT :: {}", getMethodName(joinPoint), returnValue);
        }
    }

    private String getMethodName(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        return method.getName();
    }

    private String getParams(Object[] args) {
        StringBuilder params = new StringBuilder();

        for (Object arg : args) {
            params.append(arg.getClass().getName()).append(" ");
        }

        return params.toString();
    }
}
