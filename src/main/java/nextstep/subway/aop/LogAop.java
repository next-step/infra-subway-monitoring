package nextstep.subway.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LogAop {

    private static final Logger log = LoggerFactory.getLogger("file");

    // nextstep.subway 패키지 안에 속해 있는 ui.Controller
    @Pointcut("execution(* nextstep.subway..ui.*Controller.*(..))")
    private void cut() {
    }

    @Before(value = "cut()")
    private void beforeLog(JoinPoint joinPoint) {
        String targetSimpleName = joinPoint.getTarget().getClass().getSimpleName();
        Signature signature = joinPoint.getSignature();

        log.info("method : {}, signature : {} -> request: {} ",
                targetSimpleName,
                signature.getName(),
                Arrays.toString(joinPoint.getArgs())
        );
    }

    @AfterThrowing(value = "cut()", throwing = "exception")
    public void exceptionLog(JoinPoint joinPoint, Exception exception) {
        String targetSimpleName = joinPoint.getTarget().getClass().getSimpleName();
        Signature signature = joinPoint.getSignature();

        log.error("method : {}, signature : {} -> request: {}  exception: {} ",
                targetSimpleName,
                signature.getName(),
                Arrays.toString(joinPoint.getArgs()),
                exception.getStackTrace()
        );
    }

    @AfterReturning(value = "cut()", returning = "response")
    public void responseLog(JoinPoint joinPoint, ResponseEntity<?> response) {
        String targetSimpleName = joinPoint.getTarget().getClass().getSimpleName();
        Signature signature = joinPoint.getSignature();

        log.info("method : {}, signature : {} -> response : [{}]{}",
                targetSimpleName,
                signature.getName(),
                response.getStatusCodeValue(),
                response.getBody()
        );
    }
}
