package nextstep.subway.aop;

import java.lang.reflect.Method;
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
import static net.logstash.logback.argument.StructuredArguments.kv;

@Aspect
@Component
public class LogAop {
    private static final Logger log = LoggerFactory.getLogger(LogAop.class);

    @Pointcut("execution(* nextstep.subway..*Service.*(..))")
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
        log.info("{}, {}",
            kv("error message", ex.getMessage()),
            kv("error class", ex.getClass())
        );
    }

    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }

    private void loggingParameter(ProceedingJoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        if (args.length <= 0) {
            log.info("no parameter");
            return;
        }

        for (Object arg : args) {
            log.info("parameter type = {}", arg.getClass().getSimpleName());
            log.info("parameter value = {}", arg);
        }
    }

    private void loggingResponse(ProceedingJoinPoint joinPoint) throws Throwable {
        Object result = joinPoint.proceed();

        log.info("return type = {}", result.getClass().getSimpleName());
        log.info("return value = {}", result);
    }
}
