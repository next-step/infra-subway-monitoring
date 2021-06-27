package nextstep.subway.common;

import java.util.Optional;
import java.util.StringJoiner;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import static nextstep.subway.common.util.SubwayLogger.*;

@Aspect
@Component
public class LoggingAspect {
    private static final String JOIN_DELIMITER = "/";
    private static final String NO_RETURN = "No Return";
    private static final String NO_PARAMETER = "No Parameter";

    @Around("execution(* nextstep.subway..ui.*Controller.*(..))")
    public Object infoLogHandler(ProceedingJoinPoint join) throws Throwable {
        long start = System.currentTimeMillis();
        Object proceed = join.proceed();
        writeFileInfoLog(join, start, proceed);
        return proceed;
    }

    @AfterThrowing(pointcut = "execution(* nextstep.subway..*(..))", throwing = "exception")
    public void afterThrowingLogHandler(JoinPoint joinPoint, Throwable exception) {
        jsonError(joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                exception.getClass().getSimpleName(),
                exception.getMessage(),
                makeParamToString(joinPoint.getArgs()));
    }

    private void writeFileInfoLog(ProceedingJoinPoint join, long start, Object proceed) {
        fileInfo(join.getSignature().getDeclaringTypeName(),
                join.getSignature().getName(),
                System.currentTimeMillis() - start,
                makeParamToString(join.getArgs()),
                Optional.ofNullable(proceed)
                        .map(Object::toString)
                        .orElse(NO_RETURN));
    }

    private String makeParamToString(Object[] args) {
        StringJoiner sb = new StringJoiner(JOIN_DELIMITER);
        for (Object arg : args) {
            sb.add(Optional.ofNullable(arg)
                    .map(Object::toString)
                    .orElse(NO_PARAMETER));
        }
        return sb.toString();
    }
}
