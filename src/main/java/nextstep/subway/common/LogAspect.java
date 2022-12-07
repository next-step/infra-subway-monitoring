package nextstep.subway.common;

import java.util.Arrays;
import java.util.UUID;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {

    ThreadLocal<String> threadUUID = new ThreadLocal<>();

    @Around("execution(* nextstep.subway..*.*(..)) && !@target(nextstep.subway.common.NoLogging)")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {

        String uuid = makeUUID();

        long startTime = System.currentTimeMillis();
        System.out.println("[" + uuid + "][" + joinPoint.getSignature() + "] 시작");
        Arrays.stream(joinPoint.getArgs()).forEach(param -> System.out.println("[" + uuid + "] param = " + param));
        Object result = joinPoint.proceed();
        if (result != null) {
            System.out.println("[" + uuid + "] result = " + result);
        }
        System.out.println("[" + uuid + "][" + joinPoint.getSignature() + "] 끝 ["
                + (System.currentTimeMillis() - startTime) + "(ms)]");
        return result;
    }

    private String makeUUID() {
        String[] uuid = UUID.randomUUID().toString().split("-");
        if (threadUUID.get() != null) {
            return threadUUID.get();
        }
        threadUUID.set(uuid[0]);
        return uuid[0];
    }
}
