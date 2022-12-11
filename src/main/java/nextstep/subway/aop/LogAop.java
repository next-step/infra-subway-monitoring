package nextstep.subway.aop;

import javax.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


@Aspect
@Component
public class LogAop {

    private static final Logger logger = LoggerFactory.getLogger("application");

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public Object logging(ProceedingJoinPoint pjp) throws Throwable {

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest();

        String httpMethod = request.getMethod();
        String requestURI = request.getRequestURI();
        String controllerName = pjp.getSignature().getDeclaringType().getSimpleName();
        String methodName = pjp.getSignature().getName();

        long startAt = System.currentTimeMillis();

        logger.info("----------> [REQUEST] : [{}] {} = {} - {}",
                httpMethod, requestURI, controllerName, methodName);

        Object result = pjp.proceed();

        long endAt = System.currentTimeMillis();

        logger.info("----------> [RESPONSE] : [{}] {} = {} - {} ({}ms)",
                httpMethod, requestURI, controllerName, methodName, endAt - startAt);

        return result;
    }


}
