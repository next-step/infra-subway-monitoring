package nextstep.subway.common;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.aspectj.apache.bcel.classfile.Method;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


@Aspect
@Component
public class LoggerAspect {
    private static final Logger log = LoggerFactory.getLogger("file");
    private static final ObjectMapper mapper = new ObjectMapper();

    @Around("within(nextstep.subway.*.ui..*))")
    public Object logging(ProceedingJoinPoint pjp) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        long start = System.currentTimeMillis();

        for(Object obj : pjp.getArgs()) {
            log.info("Request: {} {}: {}", request.getMethod(), request.getRequestURL(), mapper.writeValueAsString(obj));
        }

        Object result = pjp.proceed();

        long end = System.currentTimeMillis();

        log.info("Response: {} {}: {} ({}ms)", request.getMethod(), request.getRequestURL(), mapper.writeValueAsString(result), end - start);

        return result;
    }
}
