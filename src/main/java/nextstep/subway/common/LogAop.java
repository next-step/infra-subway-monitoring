package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Aspect
public class LogAop {

    private static final Logger LOGGER = LoggerFactory.getLogger("file");

    @Pointcut("execution(* nextstep.subway.*.ui.*Controller.*(..))")
    public void controllerPointcut() {
    }

    @Pointcut("execution(* nextstep.subway.*.application.*Servce.*(..))")
    public void servicePointcut() {
    }

    @Around("controllerPointcut() || servicePointcut()")
    public Object fileLogging(ProceedingJoinPoint pjp) throws Throwable {
        Signature signature = pjp.getSignature();

        String className = signature.getDeclaringTypeName();
        String methodName = signature.getName();
        String parameter = getParameterInfo(pjp, (MethodSignature) signature);
        long start = System.currentTimeMillis();

        LOGGER.info("[Request] {} {}, params = {}", className, methodName, parameter);

        Object result = pjp.proceed();

        LOGGER.info("[Response] {} {}, params = {}, result = {}, time = {}ms",
                className, methodName, parameter, result, System.currentTimeMillis() - start);

        return result;
    }

    private String getParameterInfo(ProceedingJoinPoint pjp, MethodSignature signature) {
        Object[] args = pjp.getArgs();
        String[] parameterNames = signature.getParameterNames();

        List<String> params = new ArrayList<>();
        for (int i = 0; i < parameterNames.length; i++) {
            params.add(String.format("%s => %s", parameterNames[i], args[i]));
        }

        return String.join(", ", params);
    }
}
