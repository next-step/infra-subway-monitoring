package nextstep.subway.common.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LogAdvice {

    private static final Logger LOGGER = LoggerFactory.getLogger("json");

    @Pointcut("execution(* nextstep.subway..ui.*.*(..))")
    private void advicePoint() {}

    @Before("advicePoint()")
    public void logBefore(JoinPoint joinPoint) {
        String controller =  joinPoint.getSignature().getDeclaringType().getSimpleName();
        String method = ((MethodSignature) joinPoint.getSignature()).toString();
        String parameters = "";
        for(Object arg : joinPoint.getArgs()) {
            parameters += (arg.getClass().cast(arg).toString() + ",");
        }
        if(parameters.length() > 1) {
            parameters = parameters.substring(0, parameters.length() - 1);
        }

        LOGGER.info("Controller in -> Controller name : {}, Method name : {}, parameters : {}",
                controller, method, parameters);
    }

    @AfterReturning(value = "advicePoint()", returning = "obj")
    public void afterLogging(JoinPoint joinPoint, Object obj) {
        if (obj instanceof ResponseEntity) {
            ResponseEntity response = (ResponseEntity) obj;
            Object responseBody = response.getBody();
            System.out.println(responseBody.getClass());
            LOGGER.info("Controller out -> status={}, res={}", response.getStatusCodeValue(),
                    responseBody.getClass().cast(responseBody).toString());
        }
    }

}
