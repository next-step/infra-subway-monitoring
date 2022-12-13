package nextstep.subway.config;

import nextstep.subway.auth.dto.TokenRequest;
import nextstep.subway.auth.dto.TokenResponse;
import nextstep.subway.member.dto.MemberRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    @Around("execution(* nextstep.subway.auth.ui.AuthController.login(..))")
    public Object loginLogging(ProceedingJoinPoint pjp) throws Throwable {

        String email = "";
        try {
            Object[] args = pjp.getArgs();
            email = ((TokenRequest) args[0]).getEmail();
            fileLogger.info("access to login. userId : ["+ email +"]");
        } catch (Exception e){
            fileLogger.error("[before] Fail to log");
        }

        Object result = pjp.proceed();

        try {
            String accessToken = ((TokenResponse) ((ResponseEntity<?>) result).getBody()).getAccessToken();
            fileLogger.info("Success to login. userId : [" + email + "], accessToken : ["+ accessToken +"]");
        } catch (Exception e){
            fileLogger.error("[after] Fail to log");
        }

        return result;
    }

    @Around("execution(* nextstep.subway.member.ui.MemberController.createMember(..))")
    public Object signupLogging(ProceedingJoinPoint pjp) throws Throwable {

        String email = "";
        try {
            Object[] args = pjp.getArgs();
            email = ((MemberRequest) args[0]).getEmail();
            fileLogger.info("access to signup. userId : ["+ email +"]");
        } catch (Exception e){
            fileLogger.error("[before] Fail to log");
        }

        Object result = pjp.proceed();

        try {
            fileLogger.info("Success to signup. userId : [" + email + "]");
        } catch (Exception e){
            fileLogger.error("[after] Fail to log");
        }

        return result;
    }

}
