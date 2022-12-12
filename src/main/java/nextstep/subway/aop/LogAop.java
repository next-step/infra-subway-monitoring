package nextstep.subway.aop;

import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
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
        String arg = Arrays.toString(pjp.getArgs());
        long startAt = System.currentTimeMillis();

        logger.info(">> [요청] : [{}] {} = {} - {} >> 요청 객체 : {}",
                httpMethod, requestURI, controllerName, methodName, arg);
        Object result = pjp.proceed();
        long endAt = System.currentTimeMillis();
        if(result instanceof ResponseEntity){
            logger.info(">> [응답] : [{}] {} = {} - {} ({}ms) >> 응답 객체 : {}",
                    httpMethod, requestURI, controllerName, methodName, endAt - startAt, (ResponseEntity)result);
        }
        logger.info(">> [응답] : [{}] {} = {} - {} ({}ms) >> 응답 객체 : 없음",
                httpMethod, requestURI, controllerName, methodName, endAt - startAt);

        return result;
    }


}
