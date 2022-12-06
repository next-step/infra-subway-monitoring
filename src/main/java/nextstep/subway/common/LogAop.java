package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@Aspect
@Component
public class LogAop {
    private static final Logger LOGGER = LoggerFactory.getLogger("spring");
    private static final String COMMA_JOIN_DELIMITER = ", ";

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..)) && !@annotation(nextstep.subway.common.DisableLogging)")
    public Object logging(ProceedingJoinPoint pjp) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest();

        String httpMethod = request.getMethod();
        String uri = request.getRequestURI();
        String controllerName = pjp.getSignature().getDeclaringType().getSimpleName();
        String methodName = pjp.getSignature().getName();

        long startAt = System.currentTimeMillis();

        LOGGER.info(
                "[REQUEST] {} {} -> {}({}), params = {}",
                httpMethod,
                uri,
                controllerName,
                methodName,
                paramMapToString(request.getParameterMap())
        );

        Object result = pjp.proceed();

        LOGGER.info(
                "[RESPONSE] {} {} -> {}({}), result = {}, time={}ms",
                httpMethod,
                uri,
                controllerName,
                methodName,
                result,
                System.currentTimeMillis() - startAt
        );

        return result;
    }

    private String paramMapToString(Map<String, String[]> paramMap) {
        return paramMap.entrySet()
                .stream()
                .map(entry -> String.format("%s -> (%s)", entry.getKey(), Arrays.toString(entry.getValue())))
                .collect(Collectors.joining(COMMA_JOIN_DELIMITER));
    }
}
