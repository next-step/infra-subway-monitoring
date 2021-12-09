package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class ServiceAspect {
    @Around("@within(org.springframework.stereotype.Service)")
    public Object logging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        ServiceLogger.log(proceedingJoinPoint, LogStep.START);
        Object result = proceedingJoinPoint.proceed();
        ServiceLogger.log(proceedingJoinPoint, LogStep.END);
        return result;
    }
}
