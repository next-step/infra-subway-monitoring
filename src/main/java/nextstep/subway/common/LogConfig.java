package nextstep.subway.common;

import com.google.common.base.Joiner;
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
public class LogConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger("access");

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..)) && !@target(nextstep.subway.common.DisableAccessLogging)")
    public Object accessLogging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();
        String[] methodParameters = methodSignature.getParameterNames();
        String methodParameterNames = getMethodParameterNames(methodSignature.getParameterNames());
        String methodPath = methodSignature.getDeclaringTypeName();
        String methodName = methodSignature.getName();
        String params = getMethodParameterNamesAndValues(methodParameters, proceedingJoinPoint.getArgs());

        LOGGER.info("[REQUEST] {}({}({})) = {}", methodPath, methodName, methodParameterNames, params);
        Object result = proceedingJoinPoint.proceed();
        LOGGER.info("[RESPONSE] {}({}({})) = {}", methodPath, methodName, methodParameterNames, result);

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
