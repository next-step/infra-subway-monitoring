package nextstep.subway.common;

import com.google.common.base.Joiner;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Aspect
public class ApplicationLogAop {
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    @Around("execution(* nextstep.subway..ui.*Controller.*(..))" +
            " && !@annotation(nextstep.subway.common.PrivacyNoLogging)" +
            " && !@annotation(nextstep.subway.common.BulkNoLogging)")
    public Object controllerLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = getRequest();
        String params = getRequestParams(request);
        long startAt = System.currentTimeMillis();

        Object result = joinPoint.proceed();

        long endAt = System.currentTimeMillis();
        fileLogger.info("{}({}), {}, {}, {}, {} ({}ms)", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), request.getRequestURI(), request.getMethod(), params,
                result, endAt - startAt);

        return result;
    }

    @Around("@annotation(nextstep.subway.common.PrivacyNoLogging)")
    public Object privacyLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = getRequest();
        long startAt = System.currentTimeMillis();

        Object result = joinPoint.proceed();

        long endAt = System.currentTimeMillis();
        fileLogger.info("{}({}), {}, {}, {} ({}ms)", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), request.getRequestURI(), request.getMethod(),
                result, endAt - startAt);

        return result;
    }

    @Around("@annotation(nextstep.subway.common.BulkNoLogging)")
    public Object bulkLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = getRequest();
        long startAt = System.currentTimeMillis();

        Object result = joinPoint.proceed();

        long endAt = System.currentTimeMillis();
        fileLogger.info("{}({}), {}, {}, {} ({}ms)", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), request.getRequestURI(), request.getMethod(),
                "bulk data", endAt - startAt);

        return result;
    }

    private HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }


    private String paramMapToString(Map<String, String[]> paramMap) {
        return paramMap.entrySet().stream()
                .map(entry -> String.format("%s -> (%s)",
                        entry.getKey(), Joiner.on(",").join(entry.getValue())))
                .collect(Collectors.joining(", "));
    }

    private String getRequestParams(HttpServletRequest request) {
        String params = "요청 파라미터 없음";

        Map<String, String[]> paramMap = request.getParameterMap();
        if (!paramMap.isEmpty()) {
            params = " [" + paramMapToString(paramMap) + "]";
        }
        return params;
    }
}
