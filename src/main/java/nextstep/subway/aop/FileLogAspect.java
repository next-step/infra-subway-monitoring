package nextstep.subway.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public final class FileLogAspect {
    private final Logger logger = LoggerFactory.getLogger("file");

    @Around("@annotation(FileLog)")
    private Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        String request = concatParameters(joinPoint.getArgs());
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        final String methodName = signature.getName();

        final Object response = joinPoint.proceed();

        logger.info("execute : {}, request : {}, response :{}", methodName, request, response);
        return response;
    }

    private String concatParameters(Object[] args) {
        StringBuilder stringBuilder = new StringBuilder();
        for (Object arg : args) {
            stringBuilder.append(arg);
        }
        return stringBuilder.toString();
    }
}
