package nextstep.subway.common;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import nextstep.subway.auth.application.AuthorizationException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Aspect
public class LogAop {

    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final Logger consoleLogger = LoggerFactory.getLogger("console");

    private static final String ERROR_LOG_FORMAT = "[CLASS] {} / [METHOD] {} / [ERROR] {}";
    private static final String REQUEST_INFO_LOG_FORMAT = "[CLASS] {} / [METHOD] {} / [REQUEST] {}";
    private static final String RESPONSE_INFO_LOG_FORMAT = "[CLASS] {} / [METHOD] {} / [RESPONSE] \n {}";

    @Around("execution(* nextstep.subway.auth.application.AuthService.login(..))")
    public Object loginLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        requestInfoLog(joinPoint);

        Object result = null;
        try {
            result = joinPoint.proceed();
        } catch (AuthorizationException e) {
            resultErrorLog(joinPoint, e);
            return null;
        }

        responseInfoLog(joinPoint, result);
        return result;
    }

    @Around("execution(* nextstep.subway.member.application.MemberService.createMember(..))")
    public Object signUpLogging(ProceedingJoinPoint joinPoint) throws Throwable {

        requestInfoLog(joinPoint);

        Object result = null;
        try {
            result = joinPoint.proceed();
        } catch (Exception e) {
            resultErrorLog(joinPoint, e);
            return null;
        }

        responseInfoLog(joinPoint, result);
        return result;
    }

    @Around("execution(* nextstep.subway.map.application.MapService.findPath(..))")
    public Object findPathLogging(ProceedingJoinPoint joinPoint) throws Throwable {
        requestInfoLog(joinPoint);

        Object result = null;
        try {
            result = joinPoint.proceed();
        } catch (Exception e) {
            resultErrorLog(joinPoint, e);
            return null;
        }

        responseInfoLog(joinPoint, result);
        return result;
    }

    private void responseInfoLog(ProceedingJoinPoint joinPoint, Object result) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String output = gson.toJson(result);

        consoleLogger.info(RESPONSE_INFO_LOG_FORMAT,
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                output);

        fileLogger.info(RESPONSE_INFO_LOG_FORMAT,
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                result.toString());
    }

    private void requestInfoLog(ProceedingJoinPoint joinPoint) {
        String inputParam = Arrays.toString(joinPoint.getArgs());

        consoleLogger.info(REQUEST_INFO_LOG_FORMAT,
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                inputParam);

        fileLogger.info(REQUEST_INFO_LOG_FORMAT,
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                inputParam);
    }

    private void resultErrorLog(ProceedingJoinPoint joinPoint, Exception e) {
        consoleLogger.error(ERROR_LOG_FORMAT,
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                e.toString());

        fileLogger.error(ERROR_LOG_FORMAT,
                joinPoint.getSignature().getDeclaringTypeName(),
                joinPoint.getSignature().getName(),
                e.toString());
    }
}
