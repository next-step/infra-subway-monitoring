package nextstep.subway.common;


import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LogServiceAspect {

    private static final String SERVICE_POINT_CUT = "execution(public * nextstep.subway.*.application.*Service.*(..))";
    private static final Logger logger = LoggerFactory.getLogger(LogServiceAspect.class);
    @Around(SERVICE_POINT_CUT)
    public Object log(final ProceedingJoinPoint joinPoint) throws Throwable {
        //final Logger logger = LoggerFactory.getLogger(joinPoint.getTarget().getClass());
        logger.info("{} service. args : {}", joinPoint.getSignature().getName(), Arrays.toString(joinPoint.getArgs()));

        final Object result = joinPoint.proceed();

        logger.info("{} service result. return : {}", joinPoint.getSignature().getName(), result);

        return result;
    }
}
