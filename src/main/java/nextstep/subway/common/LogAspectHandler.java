package nextstep.subway.common;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j(topic = "file")
@Aspect
@Component
public class LogAspectHandler {

    @Pointcut("@annotation(EnableControllerLog)")
    public void pointCut() {}

    @Before("pointCut()")
    public void beforeProceed(JoinPoint joinPoint) {
        try {
            printRequest(joinPoint);
        } catch (Exception ex) {
            // empty
        }
    }

    private void printRequest(JoinPoint joinPoint) {
        String method = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        log.info("[REQUEST][" + method + "]" + convertStringToParams(args));
    }

    private String convertStringToParams(final Object[] args) {
        return Arrays.stream(args)
                     .map(Object::toString)
                     .collect(Collectors.joining(","));
    }

    @AfterReturning(value = "pointCut()", returning = "result")
    public void afterProceed(JoinPoint joinPoint, Object result) {
        try {
            printResponse(joinPoint, result);
        } catch (Exception ex) {
            // empty
        }
    }

    private void printResponse(JoinPoint joinPoint, Object result) {
        String method = joinPoint.getSignature().getName();
        log.info("[RESPONSE][" + method + "]" + convertStringToResponse(result));
    }

    private String convertStringToResponse(final Object result) {
        Object response = null;
        if (result instanceof ResponseEntity) {
            ResponseEntity responseEntity = (ResponseEntity)result;
            response = responseEntity.getBody();
        }

        if (!Objects.isNull(response)) {
            return response.toString();
        }
        return "";
    }

}
