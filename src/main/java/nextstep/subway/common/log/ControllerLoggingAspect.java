package nextstep.subway.common.log;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Aspect
@Component
public class ControllerLoggingAspect {

    private static final Logger LOGGER = Loggers.FILE.logger();
    private static final String LOG_REQUEST_PREFIX = "[REQUEST ]";
    private static final String LOG_RESPONSE_PREFIX = "[RESPONSE]";

    @Pointcut("execution(public * nextstep.subway..ui.*.*(..)) " +
            "&& !@within(nextstep.subway.common.log.DisableControllerLogging)" +
            "&& !@annotation(nextstep.subway.common.log.DisableControllerLogging)")
    private void controllerLogging() {}

    @Before(value = "controllerLogging()")
    public void writeRequestLog(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        LOGGER.info("{} : {} - {}",
                LOG_REQUEST_PREFIX,
                getControllerName(signature),
                getParameterNameAndValues(signature, joinPoint));
    }

    @AfterReturning(value = "controllerLogging()", returning = "returnValue")
    public void writeResponseLog(JoinPoint joinPoint, Object returnValue) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        LOGGER.info("{} : {} - {}", LOG_RESPONSE_PREFIX, getControllerName(signature), returnValue);
    }

    @AfterThrowing(value = "controllerLogging()", throwing = "exception")
    public void writeExceptionLog(JoinPoint joinPoint, Exception exception) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        LOGGER.error("{} : {} - {}", LOG_RESPONSE_PREFIX, getControllerName(signature), exception.getMessage());
    }

    private String getControllerName(MethodSignature signature) {
        String className = signature.getDeclaringTypeName();
        String methodName = signature.getName();
        return String.format("%s.%s", className, methodName);
    }

    private String getParameterNameAndValues(MethodSignature signature, JoinPoint joinPoint) {
        String[] parameterNames = signature.getParameterNames();
        Object[] args = joinPoint.getArgs();

        List<String> params = new ArrayList<>();
        for(int i=0; i < parameterNames.length; i++) {
            params.add(String.format("%s : %s", parameterNames[i], args[i]));
        }

        return String.join(", ", params);
    }
}
