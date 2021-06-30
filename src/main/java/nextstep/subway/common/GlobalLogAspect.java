package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class GlobalLogAspect {

    private static final Logger log = LoggerFactory.getLogger("file");

    @Around("execution(* nextstep.subway..*Controller.*(..))")
    public Object measure(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            String[] names = joinPoint.getSignature().getDeclaringType().getName().split("\\.");
            String name = names[names.length - 1];

            log.info("========== " + name + " START ==========");
            return joinPoint.proceed();
        } finally {
            log.info("================ END ================");
        }
    }
}
