package nextstep.subway.common;

import com.google.gson.Gson;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.CodeSignature;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Stream;

import static java.util.stream.Collectors.*;

@Aspect
@Component
public class LoggingAOP {

    private static final Logger log = LoggerFactory.getLogger("file");
    private Gson gson = new Gson();

    @Around("@annotation(nextstep.subway.common.Loggable)")
    public Object loggingBeforeAndAfter(ProceedingJoinPoint proceedingJoinPoint) {
        Class clazz = proceedingJoinPoint.getTarget().getClass();
        Object result = null;


        MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();
        Method method = methodSignature.getMethod();
        Loggable loggable = method.getAnnotation(Loggable.class);
        StringBuilder sb = new StringBuilder();

        try {
            result = proceedingJoinPoint.proceed(proceedingJoinPoint.getArgs());
            sb.append(getRequestUrl(proceedingJoinPoint, clazz) + "\r\n");
            if(!loggable.privacy()) {
                sb.append("parameters: " + gson.toJson(params(proceedingJoinPoint)) + "\r\n");
                sb.append("response: " + gson.toJson(result));
            }
            log.info(sb.toString());
        }
        catch (Throwable throwable) {
            log.error(sb.toString());
        }
        finally {
            return result;
        }
    }

    private String getRequestUrl(JoinPoint joinPoint, Class clazz) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();
        RequestMapping requestMapping = (RequestMapping) clazz.getAnnotation(RequestMapping.class);

        String url = Stream.of( GetMapping.class, PutMapping.class, PostMapping.class,
                PatchMapping.class, DeleteMapping.class, RequestMapping.class)
                .filter(mappingClass -> method.isAnnotationPresent(mappingClass))
                .map(mappingClass -> getUrl(method, mappingClass, requestMapping))
                .findFirst().orElse(null);
        return url;
    }

    /* httpMETHOD + requestURI 를 반환 */
    private String getUrl(Method method, Class<? extends Annotation> annotationClass, RequestMapping requestMapping){
        String baseUrl = "";

        if(Objects.nonNull(requestMapping)) {
            baseUrl = requestMapping.value()[0];
        }

        Annotation annotation = method.getAnnotation(annotationClass);
        String[] value;
        String httpMethod = null;
        try {
            value = (String[])annotationClass.getMethod("value").invoke(annotation);
            httpMethod = (annotationClass.getSimpleName().replace("Mapping", "")).toUpperCase();
        } catch (IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
            return null;
        }
        return String.format("%s %s%s", httpMethod, baseUrl, value.length > 0 ? value[0] : "") ;
    }

    private Map<String, Object> params(JoinPoint joinPoint) {
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        String[] parameterNames = codeSignature.getParameterNames();
        Object[] args = joinPoint.getArgs();
        Map<String, Object> params = new HashMap<>();
        for (int i = 0; i < parameterNames.length; i++) {
            params.put(parameterNames[i], args[i]);
        }
        return params;
    }

}
