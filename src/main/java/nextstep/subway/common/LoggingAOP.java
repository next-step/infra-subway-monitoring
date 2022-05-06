package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;

@Aspect
@Component
public class LoggingAOP {

    private static final Logger log = LoggerFactory.getLogger("file");

    @Around(value = "@annotation(nextstep.subway.common.Loggable)")
    public Object loggingBeforeAndAfter(ProceedingJoinPoint proceedingJoinPoint) {

        MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();
        Loggable loggable = methodSignature.getMethod().getAnnotation(Loggable.class);

        StringBuilder loggableString = new StringBuilder();
        String names = names(proceedingJoinPoint);
        loggableString.append(names);
        loggableString.append("\r\n");
        loggableString.append(String.format("request : %s \r\n", Arrays.stream(proceedingJoinPoint.getArgs())
                .map(s -> s.toString())
                .collect(joining(","))));

        Object retVal = null;
        try {
            retVal = proceedingJoinPoint.proceed();
            loggableString.append(String.format("response : %s", retVal));
            if(!loggable.privacy()) {
                log.info(loggableString.toString());
            }
        } catch (Throwable throwable) {
            loggableString.append(String.format("exception message :%s", throwable.getMessage()));
            log.error(loggableString.toString());
        } finally {
            return retVal;
        }
    }

    private String names(ProceedingJoinPoint pjp) {
        String packageName = pjp.getSignature().getDeclaringTypeName();
        String methodName = pjp.getSignature().getName();
        return Arrays.asList(packageName, methodName).stream()
                .collect(joining(".", "[", "]"));
    }

}
