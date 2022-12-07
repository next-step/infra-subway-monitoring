package nextstep.subway.common.aspect;

import javax.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
@Aspect
public class ControllerLogAspect {

    private static final Logger logger = LoggerFactory.getLogger(ControllerLogAspect.class);

    private final String PARAMETER_SEPARATOR = "@@";

    @Pointcut("execution(* nextstep.subway..ui.*.*(..))")
    public void logPointcut() {}

    @Before("nextstep.subway.common.aspect.ControllerLogAspect.logPointcut()")
    public void beforeLogging(JoinPoint joinPoint) {
        logger.info(defaultLog(joinPoint));
    }

    @AfterReturning(value = "nextstep.subway.common.aspect.ControllerLogAspect.logPointcut()", returning = "obj")
    public void afterLogging(JoinPoint joinPoint, Object obj) {
        if (obj instanceof ResponseEntity) {
            ResponseEntity response = (ResponseEntity) obj;
            logger.info("status={}, " + defaultLog(joinPoint), response.getStatusCodeValue());
        }
    }

    public String defaultLog(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String controller = joinPoint.getSignature().getDeclaringType().getSimpleName();
        String method = request.getMethod();
        String uri = request.getRequestURI();
        String parameter = "";
        Object[] args = joinPoint.getArgs();
        for (Object arg : args) {
            parameter += arg.toString() + PARAMETER_SEPARATOR;
        }

        return String.format("Controller=%s, Method=%s, URI=%s, Parameter=%s", controller, method, uri, parameter);
    }

}
