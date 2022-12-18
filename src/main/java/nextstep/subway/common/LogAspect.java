package nextstep.subway.common;

import com.google.common.base.Joiner;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Aspect
public class LogAspect {

    private static final Logger accessLogger = LoggerFactory.getLogger("access");

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public Object fileLog(ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        String[] methodParameters = methodSignature.getParameterNames();
        String methodParameterNames = getMethodParameterNames(methodSignature.getParameterNames());
        String methodPath = methodSignature.getDeclaringTypeName();
        String methodName = methodSignature.getName();
        String params = getMethodParameterNamesAndValues(methodParameters, joinPoint.getArgs());

        accessLogger.info(">>> Request {}({}({})) = {}", methodPath, methodName, methodParameterNames, params);
        Object result = joinPoint.proceed();
        accessLogger.info(">>> Response {}({}({})) = {}", methodPath, methodName, methodParameterNames, result);

        return result;
    }

    private String getMethodParameterNames(String[] params) {
        String methodParameterNames = "";
        if(params.length > 0) {
            methodParameterNames = String.join(", ", params);
        }
        return methodParameterNames;
    }

    private String getMethodParameterNamesAndValues(String[] parameterNames, Object[] parameterValues) {
        String params = "[]";
        if(parameterNames.length == parameterValues.length && parameterNames.length > 0) {
            params = paramsToString(parameterNames, parameterValues);
        }
        return params;
    }

    private String paramsToString(String[] parameterNames, Object[] parameterValues) {
        List<String> params = new ArrayList<>();
        for(int idx = 0; idx < parameterNames.length; idx++) {
            params.add(new StringBuilder()
                    .append(parameterNames[idx])
                    .append(" -> (")
                    .append(parameterValues[idx])
                    .append(")")
                    .toString());
        }
        return Joiner.on(",")
                .join(params);
    }
}
