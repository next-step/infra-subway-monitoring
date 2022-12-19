package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger("file");

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public Object accessLogging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();
        String params = getParams(methodSignature.getParameterNames(),
            proceedingJoinPoint.getArgs());

        LOGGER.info("[REQUEST] {}#{} {}",
            methodSignature.getDeclaringTypeName(),
            methodSignature.getName(),
            params);
        Object result = proceedingJoinPoint.proceed();
        LOGGER.info("[RESPONSE] {}#{} {}",
            methodSignature.getDeclaringTypeName(),
            methodSignature.getName(),
            result);

        return result;
    }

    private String getParams(String[] name, Object[] values) {
        StringBuilder sb = new StringBuilder();
        if (name.length == 0) {
            return sb.toString();
        }
        sb.append("[");
        for (int idx = 0; idx < name.length; idx++) {
            sb.append("{")
                .append(name[idx])
                .append(":")
                .append(values[idx])
                .append("}");
        }
        sb.append("]");
        return sb.toString();
    }

}
