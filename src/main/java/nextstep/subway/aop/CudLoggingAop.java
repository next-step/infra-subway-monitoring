package nextstep.subway.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static net.logstash.logback.argument.StructuredArguments.kv;

@Aspect
@Component
public class CudLoggingAop {
    private static final Logger log = LoggerFactory.getLogger("file");

    @Pointcut("execution(* nextstep.subway.*.application.*Service.*(..)) && @annotation(LoggingTarget)")
    private void cudCut() {
    }

    @Around("cudCut()")
    public Object logging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object result;
        try {
            String methodName = proceedingJoinPoint.getSignature().toShortString();
            Object[] args = proceedingJoinPoint.getArgs();

            preLogging(methodName, args);
            result = proceedingJoinPoint.proceed();
            afterLogging(methodName, result);
        } catch (Exception exception) {
            errorLogging(exception);
            throw exception;
        }
        return result;
    }

    private void errorLogging(Exception exception) {
        log.error("exception Logging : {}", exception.getMessage());
    }

    private void afterLogging(String methodName, Object result) {
        log.debug("after Logging : {}, {}",
                kv("메서드명", methodName),
                kv("Return", result)
        );
    }

    private void preLogging(String methodName, Object[] args) {
        List<String> types = Arrays.stream(args)
                .map(it -> it.getClass().toString())
                .collect(Collectors.toList());

        log.debug("pre Logging : {}, {}, {}",
                kv("메서드명", methodName),
                kv("매개변수타입", types),
                kv("인수", Arrays.toString(args))
        );
    }
}
