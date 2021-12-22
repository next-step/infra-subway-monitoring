package nextstep.subway.logging.domain;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Component
@Aspect
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger("file");

    @Around("execution(* nextstep.subway..*Controller.*(..)) && !@target(nextstep.subway.logging.domain.Privacy)")
    public Object writeLogMessage(ProceedingJoinPoint pjp) throws Throwable {

        loggingMethod(pjp);
        loggingRequestArguments(pjp);
        Object retValue = pjp.proceed();
        loggingResponseResult(retValue);
        return retValue;
    }

    private void loggingMethod(ProceedingJoinPoint pjp) {
        MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
        Method method = methodSignature.getMethod();
        logger.info("==== Method Name {} ====", method.getName());
    }

    private void loggingRequestArguments(ProceedingJoinPoint pjp) {

        Object[] args = pjp.getArgs();
        if(args.length <= 0) {
            logger.info("no parameter");
        }

        for(Object arg : args) {
            String logFormat = String.format("request parameter type %s \n request parameter value : %s", arg.getClass().getSimpleName(), arg);
            logger.info(logFormat);
        }
    }

    private void loggingResponseResult(Object retValue) {
        String logFormat = String.format("response result type : %s \n response result value : %s", retValue.getClass().getSimpleName(), retValue);
        logger.info(logFormat);
    }
}
