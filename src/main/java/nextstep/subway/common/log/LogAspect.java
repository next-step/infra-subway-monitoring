package nextstep.subway.common.log;

import static net.logstash.logback.argument.StructuredArguments.kv;
import static nextstep.subway.common.log.Loggers.FILE_LOGGER;

import java.util.Arrays;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import nextstep.subway.common.util.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
@Aspect
public class LogAspect {
    @Around("within(nextstep.subway..*) && "
            + "(@annotation(org.springframework.web.bind.annotation.RequestMapping) || "
            + "@annotation(org.springframework.web.bind.annotation.GetMapping) || "
            + "@annotation(org.springframework.web.bind.annotation.PostMapping) || "
            + "@annotation(org.springframework.web.bind.annotation.DeleteMapping) || "
            + "@annotation(org.springframework.web.bind.annotation.PutMapping))")
    public Object handle(ProceedingJoinPoint pjp) throws Throwable {
        long start = System.currentTimeMillis();
        Object returnObj = null;
        try {
            return returnObj = pjp.proceed(pjp.getArgs());
        } finally {
            writeLog(pjp, returnObj, getHttpServletRequest(), System.currentTimeMillis() - start);
        }
    }

    private HttpServletRequest getHttpServletRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }

    private void writeLog(ProceedingJoinPoint pjp, Object returnObj, HttpServletRequest request, long elapsed) {
        FILE_LOGGER.info("[{}][{}][{}][{}ms]: {} -> {}",
                request.getRemoteHost(),
                request.getMethod(),
                request.getRequestURI(),
                elapsed,
                kv("request", writeRequestLog(pjp)),
                kv("response", StringUtils.toSimplifiedIndentedJson(returnObj))
        );
    }

    private String writeRequestLog(ProceedingJoinPoint pjp) {
        return Arrays.stream(pjp.getArgs())
                .map(StringUtils::toSimplifiedIndentedJson)
                .collect(Collectors.joining("\n"));
    }
}
