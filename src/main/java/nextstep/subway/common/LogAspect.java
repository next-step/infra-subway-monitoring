package nextstep.subway.common;

import java.util.Arrays;
import java.util.UUID;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger("subway");
    ThreadLocal<String> threadUUID = new ThreadLocal<>();

    @Around("execution(* nextstep.subway..*.*(..)) && !@target(nextstep.subway.common.NoLogging)")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = startLogging(joinPoint);
        Object result = joinPoint.proceed();
        endLogging(joinPoint, startTime, result);

        return result;
    }

    private void endLogging(ProceedingJoinPoint joinPoint, long startTime, Object result) {
        if (result != null) {
            LOGGER.info("[{}] result = {}", threadUUID.get(), result);
        }
        LOGGER.info("[{}][{}] 끝 [{}(ms)]", threadUUID.get(), joinPoint.getSignature(),
                (System.currentTimeMillis() - startTime));
    }

    private long startLogging(ProceedingJoinPoint joinPoint) {
        makeUUID();
        long startTime = System.currentTimeMillis();
        LOGGER.info("[{}][{}] 시작", threadUUID.get(), joinPoint.getSignature());
        if (joinPoint.getArgs() != null && joinPoint.getArgs().length != 0) {
            Arrays.stream(joinPoint.getArgs())
                    .forEach(param -> LOGGER.info("[{}] param = {}", threadUUID.get(), param));
        }
        return startTime;
    }

    private void makeUUID() {
        if (threadUUID.get() == null) {
            String[] uuid = UUID.randomUUID().toString().split("-");
            threadUUID.set(uuid[0]);
        }
    }
}
