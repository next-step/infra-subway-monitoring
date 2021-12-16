package nextstep.subway.monitor;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.CodeSignature;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

@Aspect
@Component
public class MonitorAspect {
    private static final Logger LOGGER = LoggerFactory.getLogger(MonitorAspect.class);
    private static final int MAX_SLOW_TIME = 2000;

    @Around(value = "@within(nextstep.subway.monitor.Monitor) || @annotation(nextstep.subway.monitor.Monitor)")
    public Object loggingController(ProceedingJoinPoint joinPoint) throws Throwable {

        final long startAt = System.currentTimeMillis();
        MDC.put("traceId", UUID.randomUUID().toString());
        LOGGER.info("Aspect Service Log == request {} : {}({}) = {}",
                getRequestUrl(joinPoint),
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                params(joinPoint));

        final Object result = joinPoint.proceed();

        final long endAt = System.currentTimeMillis();
        final long accessTime = endAt - startAt;
        if (isSlow(accessTime)) {
            LOGGER.warn("Aspect SLOW Log :: response ({}ms) : {}({}) = {}",
                    accessTime,
                    joinPoint.getSignature().getDeclaringTypeName(),
                    joinPoint.getSignature().getName(),
                    result);
            return result;
        }

        LOGGER.info("Aspect Log == response ({}ms) : {}({}) = {}",
                accessTime,
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                result);

        MDC.clear();

        return result;
    }

    private boolean isSlow(long accessTime) {
        return accessTime > MAX_SLOW_TIME;
    }

    private String getRequestUrl(JoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();

        return Stream.of(GetMapping.class, PutMapping.class, PostMapping.class,
                        PatchMapping.class, DeleteMapping.class, RequestMapping.class)
                .filter(method::isAnnotationPresent)
                .map(mappingClass -> getUrl(method, mappingClass))
                .findFirst().orElse("");
    }

    private String getUrl(Method method, Class<? extends Annotation> annotationClass) {
        Annotation annotation = method.getAnnotation(annotationClass);
        String[] value;
        String httpMethod;
        try {
            value = (String[]) annotationClass.getMethod("value").invoke(annotation);
            httpMethod = (annotationClass.getSimpleName().replace("Mapping", "")).toUpperCase();
        } catch (IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
            return null;
        }
        return String.format("%s %s", httpMethod, value.length > 0 ? value[0] : "");
    }

    private static Map<String, Object> params(JoinPoint joinPoint) {
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
