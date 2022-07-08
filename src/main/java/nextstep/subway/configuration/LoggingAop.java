package nextstep.subway.configuration;

import java.util.Arrays;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAop {

    @Pointcut("execution(* nextstep.subway..ui.*Controller.*(..))")
    private void controllerCut() {
    }

    private static final Logger log = LoggerFactory.getLogger("file");

    // Pointcut에 의해 필터링된 경로로 들어오는 경우 메서드 호출 전에 적용
    @Before("controllerCut()")
    public void beforeParameterLog(JoinPoint joinPoint) {
        Signature signature = joinPoint.getSignature();
        log.info("[REQUEST] : Controller : {}, Method : {}, Arguments : {} ", joinPoint.getTarget().getClass().getSimpleName(), signature.getName(), Arrays.toString(joinPoint.getArgs()));

    }

    // Poincut에 의해 필터링된 경로로 들어오는 경우 메서드 리턴 후에 적용
    @AfterReturning(value = "controllerCut()", returning = "response")
    public void afterReturnLog(JoinPoint joinPoint, ResponseEntity<?> response) {
        // 메서드 정보 받아오기
        Signature signature = joinPoint.getSignature();
        log.info("[Response] : STATUS[{}] Method : {}, returnBody : {} ", response.getStatusCode(), signature.getName(), response.getBody());
    }

}
