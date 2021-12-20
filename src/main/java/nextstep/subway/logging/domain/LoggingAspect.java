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

    @Around("@annotation(nextstep.subway.logging.domain.Logging)")
    public Object writeLogMessage(ProceedingJoinPoint pjp) throws Throwable {

        loggingMethod(pjp);
        loggingArguments(pjp);
        return pjp.proceed();
    }

    private void loggingMethod(ProceedingJoinPoint pjp) {
        MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
        Method method = methodSignature.getMethod();
        logger.info("==== Method Name {} ====", method.getName());
    }

    private void loggingArguments(ProceedingJoinPoint pjp) {

        Object[] args = pjp.getArgs();
        if(args.length <= 0) logger.info("no parameter");
        for(Object arg : args) {
            logger.info("parameter type : {} ", arg.getClass().getSimpleName());
            logger.info("parameter value : {}", arg);
        }

    }
}
