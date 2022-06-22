package nextstep.subway.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.Arrays;

@Aspect
@Component
public class OperateAdviceLogging {
    @Autowired
    private HttpServletRequest request;

    private final static Logger log = LoggerFactory.getLogger("json");

    @Pointcut("execution(* nextstep.subway..ui.*Controller.*(..))")
    private void logging(){

    }

    @Before("logging()")
    public void beforeParameterLog(JoinPoint joinPoint) {
        log.info("RequestURI: {}", request.getRequestURI());

        Object[] args = joinPoint.getArgs();
        if (args.length > 0) log.info("parameter = {}", Arrays.toString(args));
    }

    @AfterReturning(value = "logging()", returning = "returnObj")
    public void afterReturnLog(JoinPoint joinPoint, Object returnObj) {
        Method method = getMethod(joinPoint);
        log.info("{} success", method.getName());
        log.info("return = {}", returnObj);
    }

    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }
}
