package nextstep.subway.logging.domain;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger("file");

    @Around("@annotation(Logging)")
    public Object log(ProceedingJoinPoint pjp) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
        Logging logging = methodSignature.getMethod().getAnnotation(Logging.class);
        logger.info(String.format("%s api 호출하였습니다.", logging.target()));
        Object retValue = pjp.proceed();
        logger.info(String.format("%s api 호출이 성공하였습니다.", logging.target()));
        return retValue;
    }

}
