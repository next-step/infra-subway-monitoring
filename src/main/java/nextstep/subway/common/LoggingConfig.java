package nextstep.subway.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@Component
@Aspect
public class LoggingConfig {

    private static final Logger logger = LoggerFactory.getLogger(LoggingConfig.class);

    @Pointcut("execution(* nextstep.subway..ui.*.*(..))")
    public void logPointcut() {
    }

    @AfterReturning(value = "nextstep.subway.common.LoggingConfig.logPointcut()", returning = "obj")
    public void printLog(JoinPoint joinPoint, Object obj) {
        if (!(obj instanceof ResponseEntity)) return;
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        ResponseEntity response = (ResponseEntity) obj;
        StringBuilder paramBuilder = new StringBuilder();
        Arrays.stream(joinPoint.getArgs()).forEach(o -> paramBuilder.append(o.toString()));
        logger.info("code={},method={},uri={},params={}", response.getStatusCodeValue(), request.getMethod(), request.getRequestURI(), paramBuilder);
    }
}
