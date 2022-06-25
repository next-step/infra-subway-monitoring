package nextstep.subway.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public final class FileLogAspect {
    private final Logger logger = LoggerFactory.getLogger("file");

    @Pointcut("execution(* nextstep.subway.member.application.MemberService.*(..)) || "
            + "execution(* nextstep.subway.auth.application.AuthService.login(..))")
    private void returnLogging() {
    }

    @AfterReturning(value = "returnLogging()", returning = "response")
    private void returnLoggingMemberAction(JoinPoint joinPoint, Object response) {
        String request = concatParameters(joinPoint.getArgs());
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        final String methodName = signature.getName();

        logger.info("execute : {}, request : {}, response :{}", methodName, request, response);
    }

    private String concatParameters(Object[] args) {
        StringBuilder stringBuilder = new StringBuilder();
        for (Object arg : args) {
            stringBuilder.append(arg);
        }
        return stringBuilder.toString();
    }
}
