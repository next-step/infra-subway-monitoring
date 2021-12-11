package nextstep.subway.common;

import java.io.*;

import javax.servlet.http.*;

import org.aspectj.lang.*;
import org.aspectj.lang.annotation.*;
import org.slf4j.*;
import org.springframework.stereotype.*;
import org.springframework.web.context.request.*;

import com.fasterxml.jackson.databind.*;

@Aspect
@Component
public class AspectLogger {
    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Around("!within(nextstep.subway.auth.ui.AuthenticationPrincipalArgumentResolver) && within(nextstep.subway.*.ui..*) && @annotation(AspectLogging)")
    public Object logging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        long start = System.currentTimeMillis();

        fileLogger.info("REQ: {} {}: param: {}", request.getMethod(), request.getRequestURL(), objectMapper.writeValueAsString(request.getParameterMap()));
        if (isExistBody(request)) {
            fileLogger.info("RES: {} {}: body: {}", request.getMethod(), request.getRequestURL(), objectMapper.writeValueAsString(request.getInputStream()));
        }

        Object result = proceedingJoinPoint.proceed();
        long end = System.currentTimeMillis();

        fileLogger.info("RES: {} {}: {} ({}ms)", request.getMethod(), request.getRequestURL(), objectMapper.writeValueAsString(result), end - start);

        return result;
    }

    private boolean isExistBody(HttpServletRequest request) throws IOException {
        return request.getInputStream().available() > 0;
    }
}

