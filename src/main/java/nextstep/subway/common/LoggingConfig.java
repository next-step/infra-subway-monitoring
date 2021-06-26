package nextstep.subway.common;

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

@Aspect
@Component
public class LoggingConfig {
    //    private static final Logger log = LoggerFactory.getLogger(Controller.class);
    private static final Logger fileLogger = LoggerFactory.getLogger(LoggingConfig.class);

    @Around("execution(* nextstep.subway..ui.*Controller.*()) || execution(* nextstep.subway..application.*Service.*())")
    public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
        String params = getRequestParams();;
        joinPoint.proceed();

        long startAt = System.currentTimeMillis();

        fileLogger.info("----------> REQUEST : {}({}) = {}", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), params);

        Object result = joinPoint.proceed();

        long endAt = System.currentTimeMillis();

        fileLogger.info("----------> RESPONSE : {}({}) = {} ({}ms)", joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(), result, endAt-startAt);

        return result;
    }

    private String getRequestParams() {

        String params = "";

        RequestAttributes requestAttribute = RequestContextHolder.getRequestAttributes();

        if(requestAttribute != null){
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
                    .getRequestAttributes()).getRequest();

            Map<String, String[]> paramMap = request.getParameterMap();

            if(!paramMap.isEmpty()) {
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
