package nextstep.subway.aop;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Objects;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAop {
    private static final Logger log = LoggerFactory.getLogger("file");

    @Pointcut("@annotation(Logging)")
    private void cut() {}

    @Around("cut()")
    public void logging(ProceedingJoinPoint joinPoint) throws Throwable {
        Method method = getMethod(joinPoint);
        log.info("======= method name = {} =======", method.getName());
        loggingParameter(joinPoint);
        loggingResponse(joinPoint);
    }

    @AfterThrowing(value = "cut()", throwing = "ex")
    public void exceptionLogging(Throwable ex) {
        log.error("======================== Exception ============================");
        log.error("exception : {}", ex.getMessage());
    }

    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }

    private void loggingParameter(ProceedingJoinPoint joinPoint) {
        log.info("Target: {}", joinPoint.getTarget());
        log.info("Params: {}", Arrays.toString(joinPoint.getArgs()));
    }

    private void loggingResponse(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result = joinPoint.proceed();

        if (Objects.nonNull(result)) {
            log.info("return type = {}", result.getClass().getSimpleName());
            log.info("return value = {}", result);
        }
    }
}
