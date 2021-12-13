package nextstep.subway.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.CodeSignature;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

@Aspect
@Component
public class LogAspect {

    private static final String CONTROLLER_POINT_CUT = "execution(public * nextstep.subway..ui.*Controller.*(..))";

    private static final Logger log = LoggerFactory.getLogger(LogAspect.class);

    @Pointcut(CONTROLLER_POINT_CUT)
    private void controllerTarget() {

    }

    @Around("controllerTarget()")
    public void logBefore(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result = joinPoint.proceed(joinPoint.getArgs());
        String requestUrl = getRequestUrl(joinPoint);
        String parameters = params(joinPoint).toString();
        String response = result.toString();
        log.info(httpLogText(requestUrl, parameters, response));
    }

    private String getRequestUrl(JoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();

        String url = Stream.of(GetMapping.class, PutMapping.class, PostMapping.class, DeleteMapping.class, RequestMapping.class)
                .filter(method::isAnnotationPresent)
                .map(mappingClass -> getUrl(method, mappingClass))
                .findFirst().orElse(null);
        return url;
    }

    private String getUrl(Method method, Class<? extends Annotation> annotationClass){
        Annotation annotation = method.getAnnotation(annotationClass);
        String[] value;
        String httpMethod = null;
        try {
            value = (String[])annotationClass.getMethod("value").invoke(annotation);
            httpMethod = (annotationClass.getSimpleName().replace("Mapping", "")).toUpperCase();
        } catch (IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
            return null;
        }
        return String.format("%s %s", httpMethod, value.length > 0 ? value[0] : "") ;
    }

    private Map params(JoinPoint joinPoint) {
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        String[] parameterNames = codeSignature.getParameterNames();
        Object[] args = joinPoint.getArgs();
        Map<String, Object> params = new HashMap<>();
        for (int i = 0; i < parameterNames.length; i++) {
            params.put(parameterNames[i], args[i]);
        }
        return params;
    }

    private String httpLogText(String requestUrl, String parameters, String response) {
        StringBuilder builder = new StringBuilder();
        builder.append("===========HTTP REQUEST===========\r\n");
        builder.append(requestUrl);
        builder.append("\r\n");
        builder.append("PARAMETERS: ");
        builder.append(parameters);
        builder.append("\r\n");
        builder.append("RESPONSE: ");
        builder.append(response);
        builder.append("\r\n");
        builder.append("===================================");
        return builder.toString();
    }

    @AfterThrowing(value = "controllerTarget()", throwing = "exception")
    public void logException(JoinPoint joinPoint, Exception exception) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getSignature().getDeclaringTypeName();
        log.error("ErrorClassName: " + className);
        log.error("ErrorMethodName: " + methodName);
        log.error(exception.getMessage());
    }

}
