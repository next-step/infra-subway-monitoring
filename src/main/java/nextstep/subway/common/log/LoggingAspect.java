package nextstep.subway.common.log;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Arrays;

@Aspect
@Component
public class LoggingAspect {

    @Around("@annotation(Logging)")
    public Object log(ProceedingJoinPoint pjp) throws Throwable {
        Logger logger = LoggerFactory.getLogger("console");
        printLog(pjp, logger);
        Object proceed = pjp.proceed();
        return proceed;
    }

    private void printLog(ProceedingJoinPoint pjp, Logger logger) {
        Object[] parameterValues = pjp.getArgs();
        MethodSignature signature = (MethodSignature) pjp.getSignature();
        Method method = signature.getMethod();
        logger.info("{} 메소드 시작", method.getName());
        for (int i = 0; i < method.getParameters().length; i++) {
            logger.info("{} : {}", method.getParameters()[i].getName(), parameterValues[i]);
        }
    }

}
