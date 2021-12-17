package nextstep.subway.common;

import java.util.UUID;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Aspect
@Component
public class LogAspect {
    private static final String TRACE_ID = "trace.id";
    private static final Logger logger = LoggerFactory.getLogger("file");

    @Pointcut("execution(* nextstep.subway.member.ui.MemberController.createMember(..))"
        + " || execution(* nextstep.subway.auth.ui.AuthController.login(..))"
        + " || execution(* nextstep.subway.map.ui.MapController.findPath(..))")
    public void controllerAdvice() {
    }

    @Before("controllerAdvice()")
    public void requestLogging(JoinPoint joinPoint) {
        String traceId = UUID.randomUUID().toString();
        MDC.put(TRACE_ID, traceId);

        logger.info("{} request ", joinPoint.getSignature().getName());

        for (Object args: joinPoint.getArgs()) {
            logger.info("args: {}", args);
        }
    }

    @AfterReturning("controllerAdvice()")
    public void responseLogging(JoinPoint joinPoint) {
        logger.info("{} response", joinPoint.getSignature().getName());

        for (Object args: joinPoint.getArgs()) {
            logger.info("args: {}", args);
        }

        MDC.clear();
    }

    @AfterThrowing("controllerAdvice()")
    public void responseErrorLogging(JoinPoint joinPoint) {
        logger.error("{} response error", joinPoint.getSignature().getName());

        for (Object args: joinPoint.getArgs()) {
            logger.info("args: {}", args);
        }

        MDC.clear();
    }
}
