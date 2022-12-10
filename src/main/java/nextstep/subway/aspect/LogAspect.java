package nextstep.subway.aspect;

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
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

@Aspect
@Component
public class LogAspect {


    // nextstep.subway 하위 모든 패키지의 ui 내부 클래스의 메서드 대상
    @Pointcut("within(nextstep.subway.*.ui..*)")
    public void onRequest() {
    }

    @Around("onRequest()")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        Class clazz = joinPoint.getTarget().getClass();
        Logger cLogger = LoggerFactory.getLogger(clazz);

        Object result = joinPoint.proceed(joinPoint.getArgs());

        String url = getRequestUrl(joinPoint);
        Map<String, Object> params = params(joinPoint);

        cLogger.info("request: {}, params: {}, result: {}", url, params, result);
        return result;
    }

    private String getRequestUrl(JoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();

        return Stream.of(GetMapping.class, PutMapping.class, PostMapping.class,
                        PatchMapping.class, DeleteMapping.class, RequestMapping.class)
                .filter(method::isAnnotationPresent)
                .map(mappingClass -> getUrl(method, mappingClass))
                .findFirst().orElse(null);
    }

    private String getUrl(Method method, Class<? extends Annotation> annotationClass) {
        Annotation annotation = method.getAnnotation(annotationClass);
        String[] value;
        String httpMethod = null;

        try {
            value = (String[]) annotationClass.getMethod("value").invoke(annotation);
            httpMethod = (annotationClass.getSimpleName().replace("Mapping", "")).toUpperCase();
        } catch (InvocationTargetException | IllegalAccessException | NoSuchMethodException e) {
            return null;
        }

        return String.format("%s %s", httpMethod, value.length > 0 ? value[0] : "");
    }

    private Map<String, Object> params(JoinPoint joinPoint) {
        CodeSignature signature = (CodeSignature) joinPoint.getSignature();
        String[] parameterNames = signature.getParameterNames();
        Object[] args = joinPoint.getArgs();

        Map<String, Object> params = new HashMap<>();
        for (int i = 0; i < parameterNames.length; i++) {
            params.put(parameterNames[i], args[i]);
        }
        return params;
    }
}
