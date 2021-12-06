package nextstep.subway.aop;

import com.google.common.base.Joiner;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Aspect
public class LoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);
    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");

    @Around("@annotation(nextstep.subway.aop.ConsoleLog)")
    public Object processConsoleLogAnnotation(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String params = getRequestParams(); // request 값 가져오기

        long startAt = System.currentTimeMillis();

        log.info("console - request : {}({}) = {}", proceedingJoinPoint.getSignature().getDeclaringTypeName(),
                proceedingJoinPoint.getSignature().getName(), params);

        Object result = proceedingJoinPoint.proceed(); // 4

        long endAt = System.currentTimeMillis();

        log.info("console - response : {}({}) = {} ({}ms)", proceedingJoinPoint.getSignature().getDeclaringTypeName(),
                proceedingJoinPoint.getSignature().getName(), result, endAt - startAt);

        return result;
    }

    @Around("@annotation(nextstep.subway.aop.FileLog)")
    public Object processFileLogAnnotation(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String params = getRequestParams(); // request 값 가져오기

        long startAt = System.currentTimeMillis();

        fileLogger.info("file - request : {}({}) = {}", proceedingJoinPoint.getSignature().getDeclaringTypeName(),
                proceedingJoinPoint.getSignature().getName(), params);

        Object result = proceedingJoinPoint.proceed(); // 4

        long endAt = System.currentTimeMillis();

        fileLogger.info("file - response : {}({}) = {} ({}ms)", proceedingJoinPoint.getSignature().getDeclaringTypeName(),
                proceedingJoinPoint.getSignature().getName(), result, endAt - startAt);

        return result;
    }

    @Around("@annotation(nextstep.subway.aop.JsonLog)")
    public Object processJsonLogAnnotation(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String params = getRequestParams(); // request 값 가져오기

        long startAt = System.currentTimeMillis();

        jsonLogger.info("json - request : {}({}) = {}", proceedingJoinPoint.getSignature().getDeclaringTypeName(),
                proceedingJoinPoint.getSignature().getName(), params);

        Object result = proceedingJoinPoint.proceed(); // 4

        long endAt = System.currentTimeMillis();

        jsonLogger.info("json - response : {}({}) = {} ({}ms)", proceedingJoinPoint.getSignature().getDeclaringTypeName(),
                proceedingJoinPoint.getSignature().getName(), result, endAt - startAt);

        return result;
    }

    private String getRequestParams() {

        String params = "";

        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();

        if (requestAttributes != null) {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                    .getRequestAttributes()).getRequest();

            Map<String, String[]> paramMap = request.getParameterMap();
            if (!paramMap.isEmpty()) {
                params = " [" + paramMapToString(paramMap) + "]";
            }
        }
        return params;

    }

    private String paramMapToString(Map<String, String[]> paramMap) {
        return paramMap.entrySet().stream()
                .map(entry -> String.format("%s -> (%s)",
                        entry.getKey(), Joiner.on(",").join(entry.getValue())))
                .collect(Collectors.joining(", "));
    }
}
