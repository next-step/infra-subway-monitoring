package nextstep.subway.logging.domain;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Objects;

@Component
@Aspect
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger("file");

    @Around("execution(* nextstep.subway..*Controller.*(..))")
    public Object writeLogMessage(ProceedingJoinPoint pjp) throws Throwable {

        MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
        Privacy privacy = methodSignature.getMethod().getAnnotation(Privacy.class);

        StringBuilder sb = new StringBuilder();
        sb.append("==== Method Name");
        sb.append(getCallMethod(pjp));
        sb.append("====\n");

        if(Objects.nonNull(privacy)) {
            sb.append(extractRequestArguments(pjp));
        }
        Object retValue = pjp.proceed();
        sb.append(extractResponseResult(retValue));
        loggingIOParameter(sb.toString());
        return retValue;
    }

    private String getCallMethod(ProceedingJoinPoint pjp) {
        MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
        Method method = methodSignature.getMethod();
        return method.getName();
    }

    private String extractRequestArguments(ProceedingJoinPoint pjp) {

        StringBuilder sb = new StringBuilder();

        Object[] args = pjp.getArgs();
        if(args.length <= 0) {
            sb.append("no parameter");
            return sb.toString();
        }

        for(Object arg : args) {
            sb.append("request parameter type ");
            sb.append(arg.getClass().getSimpleName());
            sb.append("\n");
            sb.append("request parameter value");
            sb.append(arg);
            sb.append("\n");
        }
        return sb.toString();
    }

    private String extractResponseResult(Object retValue) {
        StringBuilder sb = new StringBuilder();
        sb.append("response result type");
        sb.append(retValue.getClass().getSimpleName());
        sb.append("\n");
        sb.append("response result value");
        sb.append(retValue);
        sb.append("\n");
        return sb.toString();
    }

    private void loggingIOParameter(String message) {
        logger.info(message);
    }
}
