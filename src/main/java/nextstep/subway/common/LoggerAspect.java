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
public class LoggerAspect {
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    /*@Pointcut("@annotation(org.springframework.web.bind.annotation.GetMapping)")
    public void getMappingPointCut() {
    }*/

    @Pointcut("@annotation(org.springframework.web.bind.annotation.PostMapping)")
    public void postMappingPointCut() {
    }

    @Pointcut("@annotation(org.springframework.web.bind.annotation.PutMapping)")
    public void putMappingPointCut() {
    }

    @Pointcut("@annotation(org.springframework.web.bind.annotation.DeleteMapping)")
    public void DeleteMappingPointCut() {
    }

    @Pointcut("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public void controllerPointCut() {
    }

    @Pointcut("controllerPointCut() && (postMappingPointCut() || putMappingPointCut() || DeleteMappingPointCut())")
    public void requestPointCut(){
    }

    @Around("requestPointCut()")
    public Object commonPrintLog(ProceedingJoinPoint pjp) throws Throwable {
        long startAt = System.currentTimeMillis();
        Object result = pjp.proceed();
        long endAt = System.currentTimeMillis();

        fileLogger.info("RESPONSE : {} {} ({}ms)", pjp.getSignature().getName(), result, endAt - startAt);
        jsonLogger.info("RESULT : {}", result);
        return result;
    }
}