package nextstep.subway.common.logging;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAop {
    private static final Logger log = LoggerFactory.getLogger(LogAop.class);

   @Pointcut("execution(* nextstep.subway..*Service.*(..))")
    public void pointcut() {}

    @Around("pointcut()")
    public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();
        String method = joinPoint.getSignature().toShortString();
        long begin = System.currentTimeMillis();

        Object result = joinPoint.proceed();

        long end = System.currentTimeMillis();

        log.info("실행메서드[{}] - INPUT[{}] - RETURN[{}] - TIME[{}ms] ",method, args, result, end-begin);
        return result;
    }

    @AfterThrowing(pointcut = "pointcut()", throwing = "e")
    public void afterThrowing(JoinPoint joinPoint, Exception e){
        Object[] args = joinPoint.getArgs();
        String method = joinPoint.getSignature().toShortString();
        log.error("실행메서드[{}] - INPUT[{}]",method, args, e);
    }
}
