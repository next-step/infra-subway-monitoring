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

@Aspect
@Component
public class LogAop {

    private static final Logger LOGGER = LoggerFactory.getLogger("spring");

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public Object logging(ProceedingJoinPoint pjp) throws Throwable {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest();

        String httpMethod = request.getMethod();
        String uri = request.getRequestURI();
        String controllerName = pjp.getSignature().getDeclaringType().getSimpleName();
        String methodName = pjp.getSignature().getName();

        LOGGER.info(
                "[Request] {} {} -> {}({})",
                httpMethod,
                uri,
                controllerName,
                methodName
        );

        Object result = pjp.proceed();

        LOGGER.info(
                "[Response] {} {} -> {}({}), result = {}",
                httpMethod,
                uri,
                controllerName,
                methodName,
                result
        );

        return result;
    }
}
