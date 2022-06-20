package nextstep.subway;

import com.google.common.base.Joiner;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class LogAspect {
    private static final Logger logger = LoggerFactory.getLogger(LogAspect.class);

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        String params = getRequestParams();
        long startTime = System.currentTimeMillis();
        logger.info("REQUEST : {}({}) = {}", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), params);
        Object result = joinPoint.proceed();
        long endTime = System.currentTimeMillis();
        logger.info("RESPONSE : {}({}) = {} ({}ms)", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), result, endTime - startTime);
        return result;
    }

    private String getRequestParams() {
        String params = "";
        RequestAttributes requestAttribute = RequestContextHolder.getRequestAttributes();
        if (requestAttribute != null) {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                    .getRequestAttributes()).getRequest();
            Map<String, String[]> paramMap = request.getParameterMap();
            params = getParams(params, paramMap);
        }
        return params;
    }

    private String getParams(String params, Map<String, String[]> paramMap) {
        if (!paramMap.isEmpty()) {
            params = " [" + paramMapToString(paramMap) + "]";
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