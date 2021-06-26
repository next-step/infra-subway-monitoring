package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ControllerLogAspect {

    private Logger jsonLogger = LoggerFactory.getLogger("json");
    private Logger logger = LoggerFactory.getLogger("file");

    @Pointcut("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public void controllerPointCut() {
    }

    @Around("controllerPointCut()")
    public Object commonPrintLog(ProceedingJoinPoint pjp) throws Throwable {
        long startAt = System.currentTimeMillis();
        Object result = pjp.proceed();
        long endAt = System.currentTimeMillis();
        logger.info("RESPONSE : {}({}) ({}ms)", pjp.getSignature().getName(), result, endAt - startAt);
        jsonLogger.info("Result : {}", result);
        return result;
    }
}
