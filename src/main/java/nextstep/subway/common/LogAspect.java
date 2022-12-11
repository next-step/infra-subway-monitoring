package nextstep.subway.common;

import java.util.ArrayList;
import java.util.List;
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
    private static final Logger LOGGER = LoggerFactory.getLogger("file");


    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public Object fileLog(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();

        String className = signature.getDeclaringTypeName();
        String methodName = signature.getName();
        String params = getParameterNameAndValues(joinPoint, signature);

        LOGGER.info("[REQUEST] {}.{} - params : {}", className, methodName, params);
        Object result = joinPoint.proceed();
        LOGGER.info("[RESPONSE] {}.{} - result : {}", className, methodName, result);

        return result;
    }

    private String getParameterNameAndValues(ProceedingJoinPoint joinPoint, MethodSignature signature) {
        String[] parameterNames = signature.getParameterNames();
        Object[] args = joinPoint.getArgs();

        List<String> params = new ArrayList<>();

        for (int i = 0; i < parameterNames.length; i++) {
            params.add(String.format("%s : %s", parameterNames[i], args[i]));
        }

        return String.join(", ", params);
    }
}
