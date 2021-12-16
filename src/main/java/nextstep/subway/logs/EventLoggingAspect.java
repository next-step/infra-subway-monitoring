package nextstep.subway.logs;

import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class EventLoggingAspect {
    private static final Logger logger = LoggerFactory.getLogger(EventLoggingAspect.class);

    @Around("@annotation(nextstep.subway.logs.EventLogging)")
    public Object eventLog(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object proceed = joinPoint.proceed();
        long end = System.currentTimeMillis();

        logger.info("\nTARGET: {}.{} ({}ms) \n" +
            "PARAMETERS: {} \n" +
            "RESULTS: {}",
            joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName(), end-start,
            getParameters(joinPoint),
            proceed);
        return proceed;
    }

    private String getParameters(ProceedingJoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        String[] parameterNames = methodSignature.getParameterNames();
        Object[] args = joinPoint.getArgs();
        return IntStream.range(0, args.length)
            .mapToObj(i -> String.format("%s : %s", parameterNames[i], args[i]))
            .collect(Collectors.joining(", "));
    }
}
